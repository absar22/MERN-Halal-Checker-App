const express = require('express')
const router = express.Router()
const ingredients = require('../controllers/ingredient')


router.get('/', ingredients.getIngredients);             
router.post('/', ingredients.addIngredient);            
router.put('/:id', ingredients.updateIngredient);        
router.delete('/:id', ingredients.deleteIngredient);

module.exports = router
