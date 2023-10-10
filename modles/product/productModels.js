const mongoose = require('mongoose')

const prductSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  slug:{
    type:String,
    require:true
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the selected pizza base
    required: true
  },
  description:{
    type:String,
  },
  base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Base', // Reference to the selected pizza base
    required: true,
  },
  sauce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sauce', // Reference to the selected sauce
    required: true,
  },
  cheese: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cheese', // Reference to the selected cheese
    required: true,
  },
  veggies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'veggies', // Reference to the selected veggies
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type:String,
  },
  quantity:{
    type:Number,
    default:1
  },
  shipping:{
    type:Boolean
  },

},{timestamps:true});

module.exports  = mongoose.model('Products', prductSchema);

