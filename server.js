const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3002;
app.use(cors());
const axios = require('axios');

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, High of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}
class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.vote_average = movie.vote_average;
    this.vote_count = movie.vote_count;
    this.image_url = movie.poster_path;
    this.release_date = movie.release_date;
  }
}

app.get('/', (req, res) => {
  res.send('server is working');
});

app.get('/weather', async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`);
  //error message
  if (weatherData === undefined) {
    res.status(400).send('location not found');
  } else {
    // weatherData.data.data is path to object
    let forecast = weatherData.data.data.map(day => {
      return new Forecast(day)});
    res.send(forecast);
  }
});

app.get('/movies', async (req, res) => {
  let searchQuery= req.query.searchQuery;
  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
  //error message
  if (movieData === undefined) {
    res.status(400).send('location not found');
  } else {
    // weatherData.data.data is path to object
    console.log(movieData.data);
    let movies = movieData.data.results.map(movie => {
      return new Movie(movie)});
    res.send(movies);
  }
});

app.get('*', (req, res) => {
  res.status(500).send('path not found');
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
