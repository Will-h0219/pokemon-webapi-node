const { Router } = require('express');
const { routingConstants } = require('./routing.constants');

const pokemonRouter = require('../core/routes/pokemon.routes');

function routerApi(app) {
  const router = Router();
  app.use(routingConstants.BASE_URL, router);

  router.use(routingConstants.BASE_ROUTES.POKEMON, pokemonRouter);
}

module.exports = routerApi;
