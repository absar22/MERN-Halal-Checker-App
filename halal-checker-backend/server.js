const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cors = require('cors');
const ingredients = require('./routes/ingredientsRoutes');
require('dotenv').config({ path: './config/.env' })

const PORT = process.env.PORT || 8001


connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ingredients', ingredients);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
