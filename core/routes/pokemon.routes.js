/**
 * /pokemon
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-fields.middleware');
const { getPokemons } = require('../controllers/pokemon.controller');

const router = Router();

router.get('/', getPokemons);

module.exports = router;