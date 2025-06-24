// server.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connecté')
        app.listen(process.env.PORT, () => console.log(`Serveur sur le port ${process.env.PORT}`))
    })
    .catch(err => console.log('désolé :', err))
