import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

mongoose.connect(
  'mongodb+srv://user:test123@rest-api.seovb.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, data) => {
    if (err) {
      console.log('DB connection failed')
      return
    }
    console.log('DB connection successful')
  }
)

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.send('Hello Express')
})

app.get('/world', (req, res) => {
  return res.send('world')
})

app.post('/', (req, res) => {
  return res.send(req.body)
})

const PORT = process.env.PORT || 5566

app.listen(PORT, () => {
  console.log(`\n** Servcer is listening on port ${PORT} **\n`)
})
