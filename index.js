import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/api'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  return res.send('Hello Express')
})

const PORT = process.env.PORT || 5566

app.listen(PORT, () => {
  console.log(`\n** Server is listening on port ${PORT} **\n`)
})
