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

router.post('/password', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send({
      error: `Required Fields not found: ${!username ? 'username' : ''} ${
        !password ? 'password' : ''
      }`,
    })
  }
  User.findOne({ username: username }, function (err, userModel) {
    if (err) return res.status(400).send(err)

    if (!User) return res.status(400).send({ err: 'Cannot find user' })

    return userModel.comparePassword(password, function (err, isMatch) {
      if (err) return res.status(400).send(err)

      return res.send({ correct: isMatch })
    })
  })
})

router.post('/', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send({
      error: `Required Fields not found: ${!username ? 'username' : ''} ${
        !password ? 'password' : ''
      }`,
    })
  }

  const newUser = new User({
    username: username,
    password: password,
  })
  newUser.save((error, model) => {
    if (error) {
      return res.status(400).send({ error })
    }
    return res.status(201).send(model)
  })
})

export default router
