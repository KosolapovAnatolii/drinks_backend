const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  category: { type: String, required: true }, // whiskey, bourbon etc
  photo: String,
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  age: Number,
  strength: Number,
  rating: Number,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Drink', drinkSchema);
