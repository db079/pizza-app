const mongoose = require('mongoose');


// pizza base
const baseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug:{
    type:String,
    required:true
  },
  price:{
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
  },
});

module.exports = mongoose.model('Base', baseSchema);









