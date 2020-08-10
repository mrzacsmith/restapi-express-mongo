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

export default mongoose
