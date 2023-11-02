const Pokemon = require('../models/pokemon.model');

const getPokemons = async (req, res) => {
  const results = await Pokemon.find();
  res.json({ results });
}

module.exports = {
  getPokemons
}