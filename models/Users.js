import { Schema } from 'mongoose'
import mongoose from '../database/mongodb.js'

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
})

export default mongoose.model('user', userSchema)
