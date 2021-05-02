import express from 'express'
import * as Account from '../controllers/member/account.js'
import * as auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/api/member/account/register', Account.register)
router.post('/api/member/account/login', Account.login)
router.get('/api/member/account/logout', auth.authorizeUser, Account.logout)
router.patch('/api/member/account/update', auth.authorizeUser, Account.updateDetails)
router.post('/api/member/account/email-verify', Account.emailVerify)

export default router