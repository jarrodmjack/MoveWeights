const express = require("express")
const { getAllWorkoutHistory, getUsersExerciseHistoryByName} = require("../controllers/historyController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.get("/workouts/all", getAllWorkoutHistory)
router.get("/exercises/:name", getUsersExerciseHistoryByName)

module.exports = router
