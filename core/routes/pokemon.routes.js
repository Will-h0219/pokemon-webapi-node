/**
 * /pokemon
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-fields.middleware');
const {
  getPokemons,
  createPokemon,
  deletePokemonById,
  getPokemonById,
  updatePokemon
} = require('../controllers/pokemon.controller');

const router = Router();

const createUpdateChecks = [
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('attack', 'El valor no es valido').notEmpty().isInt({ min: 0 }),
  check('defense', 'El valor no es valido').notEmpty().isInt({ min: 0 }),
  check('hp', 'El valor no es valido').notEmpty().isInt({ min: 0 }),
  check('type', 'El tipo es obligatorio').notEmpty(),
  validateFields
];

router.get('/', getPokemons);
router.get('/:pokemonId', getPokemonById);
router.post('/',
  createUpdateChecks,
  createPokemon
);
router.put('/:pokemonId',
  createUpdateChecks,
  updatePokemon
)
router.delete('/:pokemonId', deletePokemonById);

module.exports = router;