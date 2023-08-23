const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")

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
		const exerciseName = req.params.name
		const exercises = await Exercise.find({
			userId: userId,
			name: exerciseName,
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
