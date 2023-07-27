const express = require('express')
const { createWorkout, createNewUserExercise, getExercisesByUserId, getTodaysWorkoutByUserId, getExerciseById } = require('../controllers/exerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth) //use for auth

router.post('/create-workout', createWorkout)
router.post('/create-exercise', createNewUserExercise)
router.get('/exercises', getExercisesByUserId)
router.get('/exercise/:id', getExerciseById)
router.get('/todaysWorkout', getTodaysWorkoutByUserId)

module.exports = router