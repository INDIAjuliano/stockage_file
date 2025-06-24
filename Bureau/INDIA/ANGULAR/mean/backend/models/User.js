// models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },   // 🔒 nom unique
    email: { type: String, required: true, unique: true },  // 🔒 email unique
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin', 'superAdmin'],
        default: 'user'
    }
}, { timestamps: true })

export default mongoose.model('User', userSchema)