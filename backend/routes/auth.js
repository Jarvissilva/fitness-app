import express from 'express'
import * as Auth from '../controllers/auth/auth.js'
import * as auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/api/auth/current-user', auth.authorizeUser, Auth.currentUser)

export default router