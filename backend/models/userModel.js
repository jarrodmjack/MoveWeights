const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
        tzOffset: {
            type: Number,
            required: false
        }
	},
	{ timestamps: true }
)

// static signup method
// used function keyword in order to be able to use "this"
userSchema.statics.signup = async function (email, password) {
	// Validation
	if (!email || !password) {
		//if password or email field is empty
		throw Error("All fields must be filled out")
	}

	if (!validator.isEmail(email)) {
		throw Error("Not a valid email address")
	}

	if (!validator.isStrongPassword(password)) {
		throw Error("Password is not strong enough")
	}

	const exists = await this.findOne({ email })

	if (exists) {
		throw Error("Email already in use")
	}

	// hash password
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	const user = await this.create({ email, password: hash })
	return user
}

userSchema.statics.login = async function (email, password) {
	// Validation
	if (!email || !password) {
		//if password or email field is empty
		throw Error("All fields must be filled out")
	}

	const user = await this.findOne({ email })

	if (!user) {
		throw Error("Invalid login credentials") //throwing error because I dont have access to response body here
	}

	const match = await bcrypt.compare(password, user.password) //compare login password with password in database

	if (!match) {
		throw Error("Invalid login credentials")
	}

	return user
}

module.exports = mongoose.model("User", userSchema)
