const axios = require('axios');
const cashe = require('./cashe.js');

function weather(lat, lon) {
  let key = 'weather-' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cashe[key] && (Date.now() - cashe[key].timestamp < 40000)) {
    console.log('Cashe hit');
  } else {
    console.log('Cashe miss');
    cashe[key] = {};
    cashe[key].timestamp = Date.now();
    cashe[key].data = axios.get(url).then(response => parseWeather(response.body));
  }

  return cashe[key].data;
}

function parseWeather(weatherData) {
  try {
    let forecast = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(forecast);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, High of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

module.exports = weather;
