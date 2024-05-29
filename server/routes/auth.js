import express from 'express'
import {
     adminLogin,
     adminLogout,
     logout,
     loginUser,
     registerAdmin,
     registerUser,
} from '../controllers/authController.js'
import { validateSignatureAdmin, validateSignatureUser } from '../middleware/authenticate.js'

const router = express.Router()

// Authentication routes for users
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', validateSignatureUser, logout)

// Authentication routes for admins
router.post('/admin-register', registerAdmin)
router.post('/admin-login', adminLogin)
router.post('/admin-logout', validateSignatureAdmin, adminLogout)

export default router
