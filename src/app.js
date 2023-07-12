const express = require('express');
require('dotenv').config()

const initModels = require('./models/initModels');
const db = require("./utils/database");

initModels();

db.sync().then(() => console.log("synchronized database"));

const app = express();
const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
  res.send('Welcome to my server');
});

app.listen(PORT, () => {
  console.log(`Server listenning in port ${PORT}`)
}); 