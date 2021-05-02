import validator from 'validator'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Business from '../../models/business.js'

export const register = async (req, res) => {
    try {
        const dt = req.body
        if (!dt.name || !dt.email || !dt.password || !dt.address || !dt.city || !dt.state || !dt.owner || !dt.postalCode || !dt.category || !dt.contact_no)
            return res.status(400).json({ status: false, message: 'EMPTY FIELD' })
        const isEmail = validator.isEmail(dt.email)
        if (!isEmail)
            return res.status(400).json({ status: false, message: 'INVAILD EMAIL' })
        const foundBusiness = await Business.findOne({ email: dt.email })
        if (foundBusiness)
            return res.status(400).json({ status: false, message: 'BUSINESS EXIST' })
        const hashPassword = await bcrypt.hash(dt.password, 10)
        const newBusiness = new Business({ ...dt, password: hashPassword })
        await newBusiness.save()
        const token = jwt.sign({ user: newBusiness._id }, process.env.EMAIL_JWT_KEY)
        const clientUrl = `http://localhost:3000/business/account/verify-email/${token}`
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.in',
            port: 587,
            secure: false,
            auth: {
                user: 'support@coderzway.com',
                pass: 'Silv@J@rvis212',
            }
        });
        const info = await transporter.sendMail({
            from: 'Confirm Email <support@coderzway.com>',
            to: dt.email,
            subject: 'Confirm your email',
            html: `<a href='${clientUrl}'>Click Here</a>`,
        });
        res.status(200).json({ status: true, message: 'REGISTERED SUCCESSFULLY' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ status: false, message: 'EMPTY FIELD' })
        const isEmail = validator.isEmail(email)
        if (!isEmail)
            return res.status(400).json({ status: false, message: 'INVAILD EMAIL' })
        const foundBusiness = await Business.findOne({ email })
        if (!foundBusiness)
            return res.status(400).json({ status: false, message: 'NO BUSINESS EXIST' })
        if (!foundBusiness.isEmailVerified)
            return res.status(400).json({ status: false, message: 'VERIFY YOUR EMAIL' })
        const checkPassword = await bcrypt.compare(password, foundBusiness.password)
        if (!checkPassword)
            return res.status(400).json({ status: false, message: 'INVALID DETAILS' })
        const user = { id: foundBusiness._id, type: foundBusiness.type }
        const token = jwt.sign({ user }, process.env.SECRET_JWT_KEY)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 900000000000000 })
        res.status(200).json({ status: true, message: 'LOGINED SUCCESSFULLY' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const logout = (req, res) => {
    req.user = null
    res.clearCookie('jwt')
    res.status(200).json({ status: true, message: 'LOGGED OUT ' })
}

export const emailVerify = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.status(400).json({ status: false, message: 'NO ID' })
        const verifiedId = jwt.verify(id, process.env.EMAIL_JWT_KEY)
        const foundBusiness = await Business.findOne({ _id: verifiedId.user })
        foundBusiness.isEmailVerified = true
        await foundBusiness.save()
        res.status(200).json({ status: true, message: 'VERIFIED SUCCESSFULLY' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}
