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
        halal:Number,
        haram:Number,
        doubtful:Number
    }

})

module.exports = mongoose.model('Ingredient', IngredientSchema)