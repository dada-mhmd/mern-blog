import express from 'express'
import 'dotenv/config.js'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

import connectDB from './config/database.js';


const port  = process.env.PORT || 5000
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
