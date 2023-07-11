const express = require('express');
//require('dotenv').config()

const app = express();
const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
  res.send('Welcome to my server');
});

app.listen(PORT, () => {
  console.log(`Server listenning in port ${PORT}`)
});