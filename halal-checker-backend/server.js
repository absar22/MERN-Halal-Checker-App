const express = require('express')
const connectDB = require('./config/database')
const app = express()
const PORT = 8001

require('dotenv').config({path:'./config/.env'})


connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
