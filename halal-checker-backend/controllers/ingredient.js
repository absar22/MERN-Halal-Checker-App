const Ingredient = require('../models/Ingredient');

module.exports = {
  getIngredients:async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
 addIngredient: async (req, res) => {
  const { name, status, description, imageUrl, userId } = req.body;

  if (!name || !status || !description) {
    return res.status(400).json({ message: 'Name, status, and description are required' });
  }

  const ingredient = new Ingredient({
    name,
    status,
    description,
    imageUrl: imageUrl || '',
    votes: { halal: 0, haram: 0, doubtful: 0 },
    userId,
  });

  try {
    const savedIngredient = await ingredient.save();
    res.status(201).json(savedIngredient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
 deleteIngredient: async(req,res) => {
   const {id} = req.params
   try{
    const ingredient = await Ingredient.findById(id)
    if(!ingredient){
        return res.status(404).json({message: 'Ingredient not found'})
        
    }
    await Ingredient.findByIdAndDelete(id)
    res.status(200).json({message:'Ingredient deleted successfully'})
   }catch(err){
    res.status(500).json({message: err.message})
   }
 },
 updateIngredient: async(req,res) => {
   const {id} = req.params
   const {name, status, description, imageUrl, userId} = req.body
   try{
    const ingredient = await Ingredient.findById(id)
    if(!ingredient){
        return res.status(404).json({message: 'Ingredient not found'})
        
    }
    await Ingredient.findByIdAndUpdate(id, {name, status, description, imageUrl, userId})
    res.status(200).json({message:'Ingredient updated successfully'})
   }catch(err){
    res.status(500).json({message: err.message})
   }
  
}
}





