import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

//load the dot env
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//the frontend runs on port 5173
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// just a test route to see that server is running 
app.get("/", (req, res) => {
  res.json({ message: 'it is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})