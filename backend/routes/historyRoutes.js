const express = require("express")
const { getAllWorkoutHistory } = require("../controllers/historyController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.get("/workouts/all", getAllWorkoutHistory)

module.exports = router
