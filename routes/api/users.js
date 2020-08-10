import { Router } from 'express'
import User from '../../models/Users.js'
const router = Router()

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    return res.send(users)
  })
})

router.post('/', (req, res) => {
  const { username } = req.body
  const newUser = new User({
    username: username,
  })
  newUser.save((err, model) => {
    return res.send(model)
  })
})

export default router
