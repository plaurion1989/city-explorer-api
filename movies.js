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

function movies(searchQuery) {
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  if (cashe[key] && (Date.now() - cashe[key].timestamp < 40000)) {
    console.log('Cashe hit');
  } else {
    console.log('Cashe hit');
    cashe[key] = {};
    cashe[key].timestamp = Date.now();
    cashe[key].data = axios.get(url).then(response => parseMovies(response.body));
  }
}

function parseMovies(movieData){
  try{
    let movies = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movies);
  } catch(e) {
    return Promise.reject(e);
  }
}

module.exports = movies;
