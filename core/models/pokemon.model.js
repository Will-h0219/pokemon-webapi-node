const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  attack: {
    type: Number,
    required: true,
    min: 0
  },
  defense: {
    type: Number,
    required: true,
    min: 0
  },
  hp: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true
  }
});

PokemonSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object['id'] = _id;
  return object;
});

module.exports = model('Pokemon', PokemonSchema);