const express = require('express');
const router = express.Router();
const drinksController = require('../controllers/drinksControllers');
const auth = require('../middleware/auth');

router.post('/', auth, drinksController.addDrink);
router.get('/', auth, drinksController.getDrinks);
router.get('/:slug', auth, drinksController.getDrink);

module.exports = router;