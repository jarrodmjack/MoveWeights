const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")

// ALL WORKOUT/EXERCISE RELATED FUNCTIONS HAPPEN IN THIS FILE - I DID NOT WANT TO CREATE 3 SEPARATE CONTROLLER FILES

const createWorkout = async (req, res) => {
	console.log(req)
	try {
		const workout = await Workout.create({
			exercises: [],
		})
		console.log("new workout: ", workout)
		res.status(200).json(workout)
		return
	} catch (e) {
		res.status(400).json(e)
		return
	}
}

const addExerciseToWorkout = async (req, res) => {}

const createExercise = async (req, res) => {
	try {
		const userId = req.user._id
		const { muscleGroup, exerciseName } = req.body

		const exercise = await Exercise.create({
			muscleGroup: muscleGroup,
			name: exerciseName,
			sets: [],
			userId: userId,
		})
		console.log(exercise)
		res.status(200).json({ msg: "successfully created exercise" })
		return
	} catch (e) {
		console.log(e)
		res.status(400).json(e)
	}
}

const getTodaysWorkoutByUserId = async (req, res) => {
	try {
		const userId = req.user._id
		console.log(userId)
		const workout = Workout.findOne
		res.status(200).json({ msg: "Successfully got todays workout" })
		return
	} catch (e) {
		console.log(e)
		res.status(400).json({ msg: "Failed to fetch todays workout" })
		return
	}
}

const getExercises = async (req, res) => {
	try {
		const userId = req.user._id
		let exercises = await Exercise.find({ userId: userId })

		res.status(200).json(exercises)
		return
	} catch (err) {
		res.status(400).json(err)
		return
	}
}

module.exports = {
	createWorkout,
	createExercise,
	getExercises,
	getTodaysWorkoutByUserId,
}
