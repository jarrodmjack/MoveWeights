const express = require("express")
const { getSetAnalytics } = require("../controllers/analyticsController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.get("/sets", getSetAnalytics)

module.exports = router
