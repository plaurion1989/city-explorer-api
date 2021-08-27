const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
app.use(cors());
const weather = require('./weather.js');
const movies = require('./movies.js');
//------------------------------------------------

app.get('/', (req, res) => {
  res.send('server is working');
});
app.get('/weather', weatherHandler);
app.get('/movies', moviesHandler);
app.get('*', (req, res) => {
  res.status(500).send('path not found');
});

//-------------------------------------------------
function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

function moviesHandler(request, response) {
  const { searchQuery } = request.query;
  movies(searchQuery)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

//------------------------------------------------

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
