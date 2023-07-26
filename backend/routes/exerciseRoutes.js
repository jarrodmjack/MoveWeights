const express = require('express')
const { createWorkout, createExercise, getExercises, getTodaysWorkoutByUserId } = require('../controllers/exerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth) //use for auth

router.post('/create-workout', createWorkout)
router.post('/create-exercise', createExercise)
router.get('/exercises', getExercises)
router.get('/todaysWorkout', getTodaysWorkoutByUserId)

module.exports = router