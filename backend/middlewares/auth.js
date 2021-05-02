import jwt from 'jsonwebtoken'

export const authorizeUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) return res.status(400).json({ status: false, message: 'UNAUTHORIZED' })
    const verifiedToken = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.user = verifiedToken.user
    next()
}