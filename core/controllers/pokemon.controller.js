const Pokemon = require('../models/pokemon.model');

const getPokemons = async (req, res) => {
  let page = req.query.page || 1;
  page = isNaN(page) || parseInt(page) < 0 ? 1 : page;
  try {
    const count = await Pokemon.countDocuments();
    const results = await Pokemon.find()
      .limit(5)
      .skip((page - 1) * 5);
    const hasPrevious = parseInt(page) !== 1 && parseInt(page) >= 0;
    const hasNext = (parseInt(page) * 5) <= count;
    const nextPageUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${parseInt(page) + 1}`;
    res.json({
      count,
      hasPrevious,
      hasNext,
      results,
      nextPageUrl: hasNext ? nextPageUrl : null
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We couldn't process your request." });
  }
}

const createPokemon = async (req, res) => {
  const pokemon = new Pokemon(req.body);
  try {
    const pokemonDb = await pokemon.save();
    res.json({
      result: pokemonDb.id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We couldn't process your request." })
  }
}

module.exports = {
  getPokemons,
  createPokemon
}