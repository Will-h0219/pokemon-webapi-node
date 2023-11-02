const { Types } = require('mongoose');
const Pokemon = require('../models/pokemon.model');

async function getPokemons(req, res) {
  let page = req.query.page || 1;
  page = isNaN(page) || parseInt(page) < 0 ? 1 : page;
  const { name } = req.query;
  const query = {};
  if (name) {
    query.name = { $regex: '.*' + name + '.*', $options: 'i' };
  }
  try {
    const count = await Pokemon.countDocuments(query);
    const results = await Pokemon.find(query)
      .limit(5)
      .skip((page - 1) * 5);
    const hasPrevious = parseInt(page) !== 1 && parseInt(page) >= 0;
    const hasNext = (parseInt(page) * 5) < count;
    let nextPageUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${parseInt(page) + 1}`;
    if (name) {
      nextPageUrl += `&name=${name}`;
    }
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

async function getPokemonById(req, res) {
  const { pokemonId } = req.params;
  if (!Types.ObjectId.isValid(pokemonId)) {
    return res.status(400).json({ message: 'Invalid Id' });
  }
  const id = new Types.ObjectId(pokemonId);
  const pokemonDb = await Pokemon.findById(id);
  if (!pokemonDb) {
    return res.status(404).json({ message: 'Pokemon not found' });
  }
  res.json(pokemonDb);
}

async function createPokemon(req, res) {
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

async function deletePokemonById(req, res) {
  const { pokemonId } = req.params;
  try {
    if (!Types.ObjectId.isValid(pokemonId)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }
    const id = new Types.ObjectId(pokemonId);
    const document = await Pokemon.countDocuments({ _id: id });
    if (document === 0) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    await Pokemon.findByIdAndDelete(id);
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We couldn't process your request" });
  }
}

module.exports = {
  getPokemons,
  createPokemon,
  deletePokemonById,
  getPokemonById
}