const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const Set = require("../models/setModel")
const UserExercise = require("../models/userExerciseModel")
const User = require("../models/userModel")

const getAllWorkoutHistory = async (req, res) => {
	try {
		const userId = req.user.id
		const workouts = await Workout.find({ userId: userId }).populate({
			path: "exercises",
			populate: {
				path: "sets",
			},
		})
		res.status(200).json(workouts)
		return
	} catch (e) {
		res.status(400).json({ msg: "Failed to fetch history" })
		return
	}
}

module.exports = { getAllWorkoutHistory }
