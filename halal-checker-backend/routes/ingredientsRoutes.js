const express = require('express')
const router = express.Router()
const Ingredient = require('../models/Ingredient')

router.get('/', async(req,res) => {
   try {
    const ingredients = await Ingredient.find()
    res.json(ingredients)
   } catch (err) {
    res.json({ message: err })
   }
})

// Post a new ingredient
router.post('/', async (req, res) => {
  const { name, status, description, imageUrl } = req.body;

  // Validate request body
  if (!name || !status || !description) {
    return res.status(400).json({ message: 'Name, status, and description are required' });
  }

  const ingredient = new Ingredient({
    name,
    status,
    description, 
    imageUrl: imageUrl || '', // Optional field with default
    votes: { halal: 0, haram: 0, doubtful: 0 }, 
  });

  try {
    const savedIngredient = await ingredient.save();
    res.status(201).json(savedIngredient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router
