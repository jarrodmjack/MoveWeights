const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const Set = require("../models/setModel")
const UserExercise = require("../models/userExerciseModel")
const User = require("../models/userModel")

const getSetAnalytics = async (req, res) => {
	const userId = req.user.id

	const allExercises = await Exercise.find({ userId: userId })

	const setData = {
		chest: {
			sets: 0,
			percOfLifts: 0,
		},
		back: {
			sets: 0,
			percOfLifts: 0,
		},
		shoulders: {
			sets: 0,
			percOfLifts: 0,
		},
		biceps: {
			sets: 0,
			percOfLifts: 0,
		},
		triceps: {
			sets: 0,
			percOfLifts: 0,
		},
		legs: {
			sets: 0,
			percOfLifts: 0,
		},
	}

	let totalSets = 0

	for (let i = 0; i < allExercises.length; i++) {
		setData[allExercises[i].muscleGroup].sets += allExercises[i].sets.length
		totalSets += allExercises[i].sets.length
	}

	for (let key in setData) {
		setData[key].percOfLifts = Math.floor(
			(setData[key].sets / totalSets) * 100
		)
	}

	res.status(200).json(setData)
}

module.exports = { getSetAnalytics }
