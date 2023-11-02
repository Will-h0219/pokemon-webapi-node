/**
 * /pokemon
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-fields.middleware');
const { getPokemons, createPokemon } = require('../controllers/pokemon.controller');

const router = Router();

router.get('/', getPokemons);
router.post('/',
  [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('attack', 'El valor no es valido').notEmpty().isInt({ min: 0 }),
    check('defense', 'El valor no es valido').notEmpty().isInt({ min: 0 }),
    check('hp', 'El valor no es valido').notEmpty().isInt({ min: 0 }),
    check('type', 'El tipo es obligatorio').notEmpty(),
    validateFields
  ],
  createPokemon
);

module.exports = router;