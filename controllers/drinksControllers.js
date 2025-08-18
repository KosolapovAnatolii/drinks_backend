const Drink = require('../models/Drink');
const getUniqueSlug = require('../helpers/getUniqueSlug');
const cloudinaryApi = require('../helpers/cloudinaryApi');

exports.addDrink = async (req, res) => {
  const { 
    category,
    // photo,
    // public_id,
    name,
    age,
    strength,
    rating,
    description
  } = req.body;

  let photoUrl = null;
  let publicId = null;

  if (!category || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    if (req.file) {
      const result = await cloudinaryApi.uploadImage(req.file);
      photoUrl = result.secure_url;
      publicId = result.public_id;
    }

    const slug = await getUniqueSlug(name);

    const drink = await Drink.create({
      category,
      photo: photoUrl,
      public_id: publicId,
      name,
      slug,
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
  if (category) query.category = category;

  try {
    const drinks = await Drink.find(query);
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
};

exports.getDrink =  async (req, res) => {
  try {
    const drink = await Drink.findOne({ slug: req.params.slug, user: req.userId });
    if (!drink) {
      return res.status(404).json({ error: 'Drink not found' })
    };
    res.json(drink);
  } catch (err) {
    res.status(400).json({ error: 'Invalid slug format' });
  }
};

exports.deleteDrink = async (req, res) => {
  try {
    const drink = await Drink.findOne({ slug: req.params.slug, user: req.userId });

    if (!drink) {
      return res.status(404).json({ error: 'Drink not found' });
    }

    if (drink.public_id) {
      await cloudinaryApi.deleteImage(drink.public_id);
    }

    await Drink.deleteOne({ _id: drink._id });

    res.json({ message: 'Drink deleted successfully' });

  } catch (err) {
    res.status(400).json({ error: 'Failed to delete drink' });
  }
};