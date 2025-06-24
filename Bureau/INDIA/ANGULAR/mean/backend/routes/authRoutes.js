import express from 'express'
import { register, login, createAdmin } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js'

const router = express.Router()

router.post('/register', register)
router.post('/create-admin', verifyToken, isSuperAdmin, createAdmin)
router.post('/login', login)
router.get('/me', verifyToken, (req, res) => {
    res.json({ message: 'Accès autorisé', user: req.user })
})

export default router
