const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  attack: {
    type: Number,
    require: true,
    min: [0, 'Attack can not be lower than zero']
  },
  defense: {
    type: Number,
    require: true,
    min: [0, 'Defense can not be lower than zero']
  },
  hp: {
    type: Number,
    require: true,
    min: [0, 'Health points can not be lower than zero']
  },
  type: {
    type: String,
    require: true
  },
  idAuthor: {
    type: String,
    require: true
  }
});

PokemonSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Pokemon', PokemonSchema);