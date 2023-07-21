const express = require('express')
const { createWorkout } = require('../controllers/exerciseController')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// router.use(requireAuth) use for auth

router.post('/create', createWorkout)

module.exports = router