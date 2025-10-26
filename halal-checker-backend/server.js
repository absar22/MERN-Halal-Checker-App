const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const flash = require('express-flash')
const ingredients = require('./routes/ingredientsRoutes');
require('dotenv').config({ path: './config/.env' })




connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(flash());

// Routes
app.use('/api/ingredients', ingredients);

app.listen(process.env.PORT, () => {
  console.log(`Server is running you better catch it`)
})
