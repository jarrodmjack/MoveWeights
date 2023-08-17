const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const Set = require("../models/setModel")
const UserExercise = require("../models/userExerciseModel")
const User = require("../models/userModel")

const getSetAnalytics = async (req, res) => {
	const userId = req.user.id

	const allExercises = await Exercise.find({ userId: userId })

	if (allExercises.length === 0) {
		res.status(200).json({ setPercentageList: [], setEntries: null })
		return
	}

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

	console.log("setData: ", setData)
	for (let i = 0; i < allExercises.length; i++) {
		setData[allExercises[i].muscleGroup].sets += allExercises[i].sets.length
		totalSets += allExercises[i].sets.length
	}

	for (let key in setData) {
		setData[key].percOfLifts = Math.floor(
			(setData[key].sets / totalSets) * 100
		)
	}

	const setEntries = Object.entries(setData)

	const setPercentageList = setEntries.map((entry) => entry[1].sets)

	res.status(200).json({ setPercentageList, setEntries })
}

const getSetAnalyticsOneWeekTimePeriod = async (req, res) => {
	try {
		const userId = req.user.id

		const pastWeekTimePeriod = new Date(Date.now() - 604800000)

		const pastWeekExercises = await Exercise.find({
			userId: userId,
			createdAt: {
				$gte: pastWeekTimePeriod,
			},
		})

		if (pastWeekExercises.length === 0) {
			res.status(200).json({ setPercentageList: [], setEntries: null })
			return
		}

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

		for (let i = 0; i < pastWeekExercises.length; i++) {
			setData[pastWeekExercises[i].muscleGroup].sets +=
				pastWeekExercises[i].sets.length
			totalSets += pastWeekExercises[i].sets.length
		}

		for (let key in setData) {
			setData[key].percOfLifts = Math.floor(
				(setData[key].sets / totalSets) * 100
			)
		}

		const setEntries = Object.entries(setData)

		const setPercentageList = setEntries.map((entry) => entry[1].sets)

		res.status(200).json({ setPercentageList, setEntries })
		return
	} catch (e) {
		res.status(400).json({ msg: "No data" })
		return
	}
}

const getSetAnalyticsOneMonthTimePeriod = async (req, res) => {
	try {
		const userId = req.user.id

		const pastMonthTimePeriod = new Date(Date.now() - 2628000000)

		const pastMonthExercises = await Exercise.find({
			userId: userId,
			createdAt: {
				$gte: pastMonthTimePeriod,
			},
		})

		if (pastMonthExercises.length === 0) {
			res.status(200).json({ setPercentageList: [], setEntries: null })
			return
		}

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

		for (let i = 0; i < pastMonthExercises.length; i++) {
			setData[pastMonthExercises[i].muscleGroup].sets +=
				pastMonthExercises[i].sets.length
			totalSets += pastMonthExercises[i].sets.length
		}

		for (let key in setData) {
			setData[key].percOfLifts = Math.floor(
				(setData[key].sets / totalSets) * 100
			)
		}

		const setEntries = Object.entries(setData)

		const setPercentageList = setEntries.map((entry) => entry[1].sets)

		res.status(200).json({ setPercentageList, setEntries })
		return
	} catch (e) {
		res.status(400)
		return
	}
}

module.exports = {
	getSetAnalytics,
	getSetAnalyticsOneWeekTimePeriod,
	getSetAnalyticsOneMonthTimePeriod,
}
