const express = require('express')
const {
  signupUser,
  loginUser,
  sendPasswordResetLink,
  verifyPasswordResetLink,
  resetPassword
} = require('../controllers/userController')

const router = express.Router()


// Send login data
router.post('/login', loginUser)

// Send signup data
router.post('/signup', signupUser)

// router.get('/forgot-password', )
router.post('/forgot-password', sendPasswordResetLink)
router.get('/reset-password/:id/:token', verifyPasswordResetLink)
router.post('/reset-password/:id/:token', resetPassword)

module.exports = router