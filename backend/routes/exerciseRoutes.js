const express = require('express')
const { createWorkout, createNewUserExercise, getExercisesByUserId, getTodaysWorkoutByUserId } = require('../controllers/exerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth) //use for auth

router.post('/create-workout', createWorkout)
router.post('/create-exercise', createNewUserExercise)
router.get('/exercises', getExercisesByUserId)
router.get('/todaysWorkout', getTodaysWorkoutByUserId)

module.exports = router