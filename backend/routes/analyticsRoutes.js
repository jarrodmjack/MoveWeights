const express = require("express")
const {
	getSetAnalytics,
	getSetAnalyticsOneWeekTimePeriod,
	getSetAnalyticsOneMonthTimePeriod,
} = require("../controllers/analyticsController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.get("/sets", getSetAnalytics)
router.get("/sets/week", getSetAnalyticsOneWeekTimePeriod)
router.get("/sets/month", getSetAnalyticsOneMonthTimePeriod)

module.exports = router
