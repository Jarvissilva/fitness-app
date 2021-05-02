import validator from 'validator'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Member from '../../models/member.js'

export const register = async (req, res) => {
    try {
        const { name, email, password, state } = req.body
        if (!name || !email || !password || !state)
            return res.status(400).json({ status: false, message: 'EMPTY FIELD' })
        const isEmail = validator.isEmail(email)
        if (!isEmail)
            return res.status(400).json({ status: false, message: 'INVAILD EMAIL' })
        const foundMember = await Member.findOne({ email })
        if (foundMember)
            return res.status(400).json({ status: false, message: 'MEMBER EXIST' })
        const hashPassword = await bcrypt.hash(password, 10)
        const newMember = new Member({ name, email, password: hashPassword, state })
        await newMember.save()
        const token = jwt.sign({ user: newMember._id }, process.env.EMAIL_JWT_KEY)
        const clientUrl = `http://localhost:3000/member/account/email-verify/${token}`
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.in',
            port: 587,
            secure: false,
            auth: {
                user: 'support@coderzway.com',
                pass: 'Silv@J@rvis212',
            }
        });
        await transporter.sendMail({
            from: 'Confirm Email <support@coderzway.com>',
            to: email,
            subject: 'Confirm your email',
            html: `<a href='${clientUrl}'>Click Here</a>`,
        });
        res.status(200).json({ status: true, message: 'VERIFICATION SENDED' })
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
        const foundMember = await Member.findOne({ email })
        if (!foundMember)
            return res.status(400).json({ status: false, message: 'NO MEMBER EXIST' })
        const checkPassword = await bcrypt.compare(password, foundMember.password)
        if (!checkPassword)
            return res.status(400).json({ status: false, message: 'INVALID DETAILS' })
        const user = { id: foundMember._id, type: foundMember.type }
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

export const updateDetails = async (req, res) => {
    try {
        const dt = req.body
        if (!dt)
            return res.status(400).json({ status: false, message: 'EMPTY FIELD' })
        const foundMember = await Member.findOne({ _id: req.user._id })
        if (!foundMember)
            return res.status(400).json({ status: false, message: 'NO MEMBER EXIST' })
        Member.findOneAndUpdate({ ...dt, })
        await foundMember.save()
        res.status(200).json({ status: true, message: 'ACCOUNT UPDATED' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const emailVerify = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.status(400).json({ status: false, message: 'NO ID' })
        const verifiedId = jwt.verify(id, process.env.EMAIL_JWT_KEY)
        const foundMember = await Member.findOne({ _id: verifiedId.user })
        foundMember.isEmailVerified = true
        await foundMember.save()
        res.status(200).json({ status: true, message: 'VERIFIED SUCCESSFULLY' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }

}

