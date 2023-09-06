// ALL WORKOUT/EXERCISE RELATED FUNCTIONS HAPPEN IN THIS FILE - I DID NOT WANT TO CREATE 3 SEPARATE CONTROLLER FILES
const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const Set = require("../models/setModel")
const UserExercise = require("../models/userExerciseModel")
const User = require("../models/userModel")
const Template = require("../models/templateModel")

const createWorkout = async (req, res) => {
	const todayUTC = new Date()
	const localTimeOffset = req.body.tzOffset
	let dtOffset = new Date(
		todayUTC.setUTCMinutes(todayUTC.getUTCMinutes() - localTimeOffset)
	)

	const userId = req.user._id

	try {
		const workout = await Workout.create({
			exercises: [],
			userId: userId,
			createdAt: dtOffset,
		})
		const exercise = await Exercise.create({
			muscleGroup: req.body.muscleGroup,
			name: req.body.exerciseName,
			sets: [],
			workoutId: workout._id,
			userId: userId,
		})
		const set = await Set.create({
			weight: req.body.weight,
			reps: req.body.numOfReps,
			exerciseId: exercise._id,
			userId: userId,
		})

		exercise.sets.push(set._id)
		workout.exercises.push(exercise._id)

		await exercise.populate("sets")
		await workout.save()
		await exercise.save()
		await set.save()

		res.status(200).json(exercise)
		return
	} catch (e) {
		res.status(400).json(e)
		return
	}
}

const applyTemplateToWorkout = async (req, res) => {
	try {
		const todayUTC = new Date()
		const localTimeOffset = req.body.tzOffset
		let dtOffset = new Date(
			todayUTC.setUTCMinutes(todayUTC.getUTCMinutes() - localTimeOffset)
		)
		const userId = req.user._id
		const templateId = req.body.templateId
		const template = await Template.findById(templateId)
		if (!req.body.workoutId) {
			const workout = await Workout.create({
				exercises: [],
				userId: userId,
				createdAt: dtOffset,
			})

			const exerciseObjectList = template.exercises.map(
				(templateExercise) => {
					return {
						userId,
						muscleGroup: templateExercise.muscleGroup,
						name: templateExercise.exerciseName,
						workoutId: workout._id,
						sets: [],
					}
				}
			)
			const exercises = await Exercise.insertMany(exerciseObjectList)

			for (let i = 0; i < exercises.length; i++) {
				workout.exercises.push(exercises[i]._id)
			}

			await workout.save()
		} else {
			const workout = await Workout.findById(req.body.workoutId)

			const exerciseObjectList = template.exercises.map(
				(templateExercise) => {
					return {
						userId,
						muscleGroup: templateExercise.muscleGroup,
						name: templateExercise.exerciseName,
						workoutId: workout._id,
						sets: [],
					}
				}
			)
			const exercises = await Exercise.insertMany(exerciseObjectList)
			for (let i = 0; i < exercises.length; i++) {
				workout.exercises.push(exercises[i]._id)
			}
			await workout.save()
		}

		res.status(200).json({ msg: "success" })
		return
	} catch (e) {
		res.status(400).json({
			msg: "There was an issue applying the template",
		})
	}
}

const addExerciseToWorkout = async (req, res) => {
	try {
		const userId = req.user._id
		const workoutId = req.params.id

		const workout = await Workout.findById(workoutId)

		const exercise = await Exercise.create({
			muscleGroup: req.body.muscleGroup,
			name: req.body.exerciseName,
			sets: [],
			workoutId: workoutId,
			userId: userId,
		})

		const set = await Set.create({
			weight: req.body.weight,
			reps: req.body.numOfReps,
			exerciseId: exercise._id,
			userId: userId,
		})

		exercise.sets.push(set._id)
		workout.exercises.push(exercise._id)

		await exercise.populate("sets")
		await workout.save()
		await exercise.save()
		await set.save()

		res.status(200).json(exercise)
		return
	} catch (e) {
		console.error(e)
		res.status(400).json({ msg: "There was an issue adding the exercise" })
		return
	}
}

const addSetToExercise = async (req, res) => {
	try {
		const userId = req.user._id
		const exerciseId = req.body.exerciseId

		const newSet = await Set.create({
			weight: req.body.weight,
			reps: req.body.numOfReps,
			exerciseId: exerciseId,
			userId: userId,
		})

		const exercise = await Exercise.findByIdAndUpdate(
			exerciseId,
			{
				$push: { sets: newSet },
			},
			{ new: true }
		).populate("sets")

		await newSet.save()
		await exercise.save()

		res.status(200).json(newSet)
		return
	} catch (e) {
		res.status(400).json({ msg: "There was an issue adding the set" })
	}
}

const updateSet = async (req, res) => {
	try {
		const setId = req.params.id

		const set = await Set.findByIdAndUpdate(
			setId,
			{
				weight: req.body.weight,
				reps: req.body.reps,
			},
			{ new: true }
		)

		res.status(200).json(set)
	} catch (e) {
		res.status(400).json({ msg: "There was an issue updating the set" })
		console.error(e)
	}
}

const deleteSetFromExercise = async (req, res) => {
	try {
		const exerciseId = req.body.exerciseId
		const setId = req.params.id
		const exercise = await Exercise.findById(exerciseId)
		exercise.sets = exercise.sets.filter(
			(set) => set._id.toString() !== setId
		)

		await exercise.save()
		await exercise.populate("sets")

		await Set.findByIdAndDelete(setId)

		res.status(200).json({ msg: "Successfully deleted" })
	} catch (e) {
		console.error(e)
		res.status(400).json({ msg: "Error deleting" })
	}
}

const createNewUserExercise = async (req, res) => {
	try {
		const userId = req.user._id
		const { muscleGroup, exerciseName } = req.body

		const exercise = await UserExercise.create({
			muscleGroup: muscleGroup,
			name: exerciseName,
			userId: userId,
		})
		res.status(200).json(exercise)
		return
	} catch (e) {
		console.error(e)
		res.status(400).json(e)
	}
}

const deleteExerciseFromWorkout = async (req, res) => {
	const exerciseId = req.params.id
	try {
		await Exercise.findByIdAndDelete(exerciseId)
		await Set.deleteMany({
			exerciseId: exerciseId,
		})
		res.status(200).json({ msg: "success" })
		return
	} catch (e) {
		const exercise = await Exercise.findById(exerciseId)
		console.error(e)
		res.status(400).json(exercise)
	}
}

const getTodaysWorkoutByUserId = async (req, res) => {
	console.log("req: ", req.body)
	console.log("user: ", req.user)
	try {
		const userId = req.user._id
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

		const workout = await Workout.findOne({
			userId: userId,
			createdAt: {
				$gte: startOfDay,
				$lt: endOfDay,
			},
		}).populate({
			path: "exercises",
			populate: {
				path: "sets",
			},
		})
		res.status(200).json(workout)
		return
	} catch (e) {
		console.error(e)
		res.status(400).json({ msg: "Failed to fetch todays workout" })
		return
	}
}

const getExerciseById = async (req, res) => {
	try {
		const exerciseId = req.params.id
		const exercise = await Exercise.findById(exerciseId).populate("sets")

		if (!exercise) {
			res.status(401).json(undefined)
			return
		}
		res.status(200).json(exercise)
		return
	} catch (e) {
		res.status(400)
		return
	}
}

const getExercisesByUserId = async (req, res) => {
	try {
		const userId = req.user._id
		let exercises = await UserExercise.find({ userId: userId })
		res.status(200).json(exercises)
		return
	} catch (err) {
		res.status(400).json(err)
		return
	}
}

module.exports = {
	createWorkout,
	createNewUserExercise,
	getExercisesByUserId,
	getTodaysWorkoutByUserId,
	getExerciseById,
	addSetToExercise,
	deleteSetFromExercise,
	deleteExerciseFromWorkout,
	updateSet,
	addExerciseToWorkout,
	applyTemplateToWorkout,
}
