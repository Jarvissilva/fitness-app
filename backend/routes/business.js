import express from 'express'
import * as Account from '../controllers/business/account.js'
import * as Business from '../controllers/business/business.js'
import * as Review from '../controllers/business/review.js'
import * as Saved from '../controllers/business/saved.js'
import * as auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/api/business/account/register', Account.register)
router.post('/api/business/account/login', Account.login)
router.get('/api/business/account/logout', auth.authorizeUser, Account.logout)
router.post('/api/business/account/email-verify', Account.emailVerify)

router.get('/api/businesses', Business.fetchAll)
router.post('/api/businesses/:id', Business.fetchBy)
router.get('/api/business/:id', Business.fetchById)
router.get('/api/business/search/:term', Business.search)

router.post('/api/business/:id/saved', auth.authorizeUser, Saved.add)
router.patch('/api/business/:id/saved', auth.authorizeUser, Saved.remove)

router.post('/api/business/:id/review', auth.authorizeUser, Review.create)
router.patch('/api/business/:id/review/:reviewId', auth.authorizeUser, Review.update)
router.delete('/api/business/:id/review/:reviewId', auth.authorizeUser, Review.remove)

export default router