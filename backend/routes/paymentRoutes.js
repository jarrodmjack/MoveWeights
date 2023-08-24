const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const { createCheckoutSession } = require("../controllers/paymentController")

const router = express.Router()
router.use(requireAuth) //use for auth

router.post("/create-checkout-session", createCheckoutSession)

module.exports = router
