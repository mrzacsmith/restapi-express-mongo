import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { Schema } from 'mongoose'

mongoose.connect(
  'mongodb+srv://user:test123@rest-api.seovb.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },
  (err, data) => {
    if (err) {
      console.log('DB connection failed')
      return
    }
    console.log('DB connection successful')
  }
)

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
})

const User = mongoose.model('user', userSchema)

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.send('Hello Express')
})

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    return res.send(users)
  })
})

app.post('/users', (req, res) => {
  const { username } = req.body
  const newUser = new User({
    username: username,
  })
  newUser.save((err, model) => {
    return res.send(model)
  })
})

const PORT = process.env.PORT || 5566

app.listen(PORT, () => {
  console.log(`\n** Servcer is listening on port ${PORT} **\n`)
})
