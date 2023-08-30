const express = require("express")
const {
	createWorkout,
	createNewUserExercise,
	getExercisesByUserId,
	getTodaysWorkoutByUserId,
	getExerciseById,
	addSetToExercise,
	addExerciseToWorkout,
	deleteSetFromExercise,
	updateSet,
	deleteExerciseFromWorkout,
	applyTemplateToWorkout
} = require("../controllers/exerciseController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.post("/create-workout", createWorkout)
router.post("/apply-template", applyTemplateToWorkout)
router.post("/exercise/add-set", addSetToExercise)
router.post("/create-exercise", createNewUserExercise)
router.post("/workout/:id/add-exercise", addExerciseToWorkout)
router.get("/exercises", getExercisesByUserId)
router.get("/exercise/:id", getExerciseById)
router.get("/todaysWorkout", getTodaysWorkoutByUserId)
router.put("/set/:id", updateSet)
router.delete("/set/:id", deleteSetFromExercise)
router.delete("/exercise/:id/delete", deleteExerciseFromWorkout)

module.exports = router
