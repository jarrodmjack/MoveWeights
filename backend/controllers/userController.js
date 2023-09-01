const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")
require("dotenv").config()

const createToken = (_id) => {
	//reusable token generation for login and signup
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" })
}

const loginUser = async (req, res) => {
	const { email, password, tzOffset } = req.body
	try {
		const user = await User.login(email, password) // static method from user model
		user.tzOffset = tzOffset
		await user.save()
		// create a token
		const token = createToken(user._id)

		res.status(200).json({ email, token })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

// Signup user
const signupUser = async (req, res) => {
	const { email, password, tzOffset } = req.body
	try {
		const user = await User.signup(email, password) // static method from user model
		user.tzOffset = tzOffset
		await user.save()
		// create a token
		const token = createToken(user._id)

		res.status(200).json({ email, token })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

const sendPasswordResetLink = async (req, res) => {
	const { email } = req.body

	const user = await User.findOne({ email: email })

	if (!user) {
		res.status(400).json({ error: "User not found" })
		return
	}

	// create password link valid for 15m
	const secret = process.env.SECRET + user.password
	const payload = {
		email: user.email,
		id: user.id,
	}

	const token = jwt.sign(payload, secret, { expiresIn: "15m" })

	// THIS LINK NEEDS TO BE SENT TO EMAIL
	const passwordResetLink = `${process.env.NEXT_FRONTEND_URL}/reset-password/${user.id}/${token}`
	console.log("reset link: ", passwordResetLink)

	res.status(200).json({ msg: "success" })
}

const verifyPasswordResetLink = async (req, res) => {
	const { id, token } = req.params
	const user = await User.findById(id)
	if (!user) {
		res.status(400).json({ err: "Invalid Link" })
		return
	}

	const secret = process.env.SECRET + user.password
	try {
		const payload = jwt.verify(token, secret) //if no error, information is good
		res.status(200).json({ email: user.email, msg: "Success" })
		return
	} catch (e) {
		console.log(e)
		res.status(400).json({ msg: e.message })
	}
}

const resetPassword = async (req, res) => {
	const { id, token } = req.params
	const { password, password2 } = req.body

	const user = await User.findById(id)
	if (!user) {
		res.status(400).json({ msg: "Invalid user" })
		return
	}

	const secret = process.env.SECRET + user.password
	try {
		// const payload = jwt.verify(token, secret)

		if (password !== password2) {
			throw Error("Passwords must match")
		}

		if (!validator.isStrongPassword(password)) {
			throw Error("Password is not strong enough")
		}
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		user.password = hash
		await user.save()
		res.status(200).json({ msg: "successfully reset password" })
		return
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

module.exports = {
	signupUser,
	loginUser,
	sendPasswordResetLink,
	verifyPasswordResetLink,
	resetPassword,
}
