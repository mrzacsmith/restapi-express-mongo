import { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import mongoose from '../database/mongodb.js'

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
})

const upatePassword = (user, next) => {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error)

    bcrypt.hashSync(user.password, salt, (error, hash) => {
      if (error) return next(error)

      user.password = hash
      next()
    })
  })
}

userSchema.pre('save', () => {
  upatePassword(this, next)
})

userSchema.methods.comparePassword = (password, next) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (error) return next(error)
  })
}

export default mongoose.model('user', userSchema)
