const express = require("express")
const {
	createWorkout,
	createNewUserExercise,
	getExercisesByUserId,
	getTodaysWorkoutByUserId,
	getExerciseById,
	addSetToExercise,
	saveGeoLocation
} = require("../controllers/exerciseController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
// router.use(requireAuth) //use for auth

router.post("/create-workout", createWorkout)
router.post("/exercise/add-set", addSetToExercise)
router.post("/create-exercise", createNewUserExercise)
router.post("/geo", saveGeoLocation)
router.get("/exercises", getExercisesByUserId)
router.get("/exercise/:id", getExerciseById)
router.get("/todaysWorkout", getTodaysWorkoutByUserId)

module.exports = router
