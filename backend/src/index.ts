import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes'

//load the dot env before using them 
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL

//the frontend runs on port 5173
app.use(cors({ origin: FRONTEND_URL || 'http://localhost:5173'}))
app.use(express.json())

app.use(router)

// just a test route to see that server is running 
app.get("/", (req, res) => {
  res.json({ message: 'it is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})