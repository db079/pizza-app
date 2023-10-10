const mongoose = require('mongoose')
const sauceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Sauce', sauceSchema);

