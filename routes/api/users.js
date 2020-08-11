import { Router } from 'express'
import User from '../../models/Users.js'
import jwt from 'jsonwebtoken'
import { secret, auth } from '../../config/passport.js'
const router = Router()

router.get('/', auth, (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      res.status(500).send({ error })
    }
    return res.send(users)
  })
})

router.post('/token', (req, res) => {
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

      if (!isMatch) {
        return res.status(401).send({ err: 'invalid password' })
      }

      const payload = { id: userModel._id }
      const token = jwt.sign(payload, secret)
      return res.send(token)
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

router.get('/current', auth, (req, res) => {
  return res.send(req.user)
})

export default router
