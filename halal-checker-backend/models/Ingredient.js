const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    name:{
    type: String,
    required: true
    },
    status:{
        type:String,
        enum:['halal','haram','doubtful'],
        required: true
    },
    description:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String,
        required: true
    },
    votes:{
       halal: { type: Number, default: 0 },
    haram: { type: Number, default: 0 },
    doubtful: { type: Number, default: 0 },
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    lastUpdated:{
    type: Date,
    default: Date.now
    },
    userId: {
    type: String,
    required: false
  }

})

module.exports = mongoose.model('Ingredient', IngredientSchema)