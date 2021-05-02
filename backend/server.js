import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import AuthRouter from './routes/auth.js'
import BusinessRouter from './routes/business.js'
import MemberRouter from './routes/member.js'

const server = express()
const port = process.env.PORT || 5500

dotenv.config()
server.use(express.json())
server.use(cookieParser())
server.use(express.urlencoded({ extended: true }))
server.use(helmet())
server.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.43.222:3000', 'https://fitwingz.netlify.app'], credentials: true
}))

server.use('/', AuthRouter)
server.use('/', BusinessRouter)
server.use('/', MemberRouter)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => server.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`)))
    .catch(error => console.log(`ERROR WHILE CONNECTING TO DATABASE ${error}`))