const axios = require('axios');
const cashe = require('./cashe.js');

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

async function movies(req, res) {
  let searchQuery = req.query.searchQuery;
  console.log(cashe);
  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
  //error message
  if (movieData === undefined) {
    res.status(400).send('location not found');
  } else {
    // weatherData.data.data is path to object
    console.log(movieData.data);
    let movies = movieData.data.results.map(movie => {
      return new Movie(movie)
    });
    res.send(movies);
  }
};

module.exports = movies;
