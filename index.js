const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const { dbConnection } = require('./config/database');
const routerApi =  require('./routing');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.get('/', (req, res) => res.json({ message: 'Hello world!' }));

routerApi(app);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});