const Drink = require('../models/Drink');

exports.addDrink = async (req, res) => {
  const { 
    category,
    photo,
    name,
    age,
    strength,
    rating,
    description
  } = req.body;

  if (!category || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const drink = await Drink.create({
      category,
      photo,
      name,
      age,
      strength,
      rating,
      description,
      user: req.userId
    });
    res.status(201).json(drink);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create Drink' });
  }
};

exports.getDrinks = async (req, res) => {
  const query = { user: req.userId }

  const { category } = req.query;
  if (category) query.categoy = category;

  try {
    const drinks = await Drink.find(query);
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
};

exports.getDrink =  async (req, res) => {
  try {
    const drink = await Drink.findOne({ _id: req.params.id, user: req.userId });
    if (!drink) {
      return res.status(404).json({ error: 'Drink not found' })
    };
    res.json(drink);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};
