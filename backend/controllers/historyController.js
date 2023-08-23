const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const User = require("../models/userModel")

const getAllWorkoutHistory = async (req, res) => {
	try {
		const userId = req.user.id
		const workouts = await Workout.find({ userId: userId })
			.sort({ createdAt: "desc" })
			.populate({
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

const getUsersExerciseHistoryByName = async (req, res) => {
	try {
		const userId = req.user.id
		const todayUTC = new Date()

		const user = await User.findById(userId)
		const currentTimeZoneOffset = user.tzOffset

		const endOfDay = new Date(
			new Date().setUTCHours(
				Math.floor(currentTimeZoneOffset / 60),
				currentTimeZoneOffset % 60,
				0,
				0
			)
		)

		if (
			todayUTC.getUTCHours() > endOfDay.getUTCHours() ||
			(todayUTC.getUTCHours() === endOfDay.getUTCHours() &&
				endOfDay.getUTCMinutes() +
					endOfDay.getUTCSeconds() +
					endOfDay.getUTCMilliseconds() >
					0)
		) {
			endOfDay.setDate(endOfDay.getUTCDate() + 1)
		}

		const startOfDay = new Date(endOfDay.getTime() - 86399999)
		const exerciseName = req.params.name
		const exercises = await Exercise.find({
			userId: userId,
			name: exerciseName,
			createdAt: {
				$lt: startOfDay,
			},
		})
			.sort({ createdAt: "desc" })
			.populate("sets")

		res.status(200).json(exercises)
		return
	} catch (e) {
		res.status(400).json({ msg: "Failed to fetch history" })
		return
	}
}

module.exports = { getAllWorkoutHistory, getUsersExerciseHistoryByName }
