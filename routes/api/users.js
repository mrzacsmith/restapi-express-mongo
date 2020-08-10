import { Router } from 'express'
import User from '../../models/Users.js'
const router = Router()

router.get('/', (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      res.status(500).send({ error })
    }
    return res.send(users)
  })
})

router.post('/', (req, res, next) => {
  const { username } = req.body
  if (!username) {
    return res.status(400).send({ error: 'Request fields not found: username' })
  }

  const newUser = new User({
    username: username,
  })
  newUser.save((error, model) => {
    if (error) {
      return res.status(400).send({ error })
    }
    return res.status(201).send(model)
  })
})

export default router
