import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRouter from './Routes/AuthRoutes.js'
import UserRouter from './Routes/UserRoutes.js'
import PostRouter from './Routes/PostRoute.js'
import UploadRouter from './Routes/UploadRoutes.js'
import cors from 'cors'
dotenv.config()

const app = express()

//Middleware
app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Connection
const PORT = process.env.PORT
const CONNECTION = process.env.CONNECTION
mongoose.set('strictQuery', true)
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(error))

// usage of routes
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/posts', PostRouter)
app.use('/upload', UploadRouter)
