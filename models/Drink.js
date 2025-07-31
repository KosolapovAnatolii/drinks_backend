const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  category: String, // whiskey, bourbon etc
  photo: String,
  name: String,
  age: Number,
  strength: Number,
  rating: Number,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Drink', drinkSchema);
