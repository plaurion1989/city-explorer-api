const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
app.use(cors());
const weather = require('./weather.js');
const movies = require('./movies.js');
//----------------------------------------------------------

app.get('/', (req, res) => {
  res.send('server is working');
});
app.get('/weather', weather);
app.get('/movies', movies);
app.get('*', (req, res) => {
  res.status(500).send('path not found');
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
