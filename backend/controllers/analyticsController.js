const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const Set = require("../models/setModel")
const UserExercise = require("../models/userExerciseModel")
const User = require("../models/userModel")

const getSetAnalytics = async (req, res) => {
	const userId = req.user.id

	const allExercises = await Exercise.find({ userId: userId })

	const setCountMap = {
		chest: 0,
		back: 0,
		shoulders: 0,
		biceps: 0,
		triceps: 0,
		legs: 0,
	}

	for (let i = 0; i < allExercises.length; i++) {
		setCountMap[allExercises[i].muscleGroup] += allExercises[i].sets.length
	}

	const setPercentages = Object.values(setCountMap)

	res.status(200).json(setPercentages)
}

module.exports = { getSetAnalytics }
