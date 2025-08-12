const slugify = require('slugify');
const Drink = require('../models/Drink');

async function getUniqueSlug(name) {
  if (!name) throw new Error('Name is required to generate slug');
  
  let slug = slugify(name, { lower: true, strict: true });
  let uniqueSlug = slug;
  let counter = 1;

  while (await Drink.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

module.exports = getUniqueSlug;
