const axios = require('axios');
const cashe = require('./cashe.js');

async function weather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  console.log(cashe);

  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`);
  //error message
  if (weatherData === undefined) {
    res.status(400).send('location not found');
  } else {
    // weatherData.data.data is path to object
    let forecast = weatherData.data.data.map(day => {
      return new Forecast(day)
    });
    res.send(forecast);
  }
};

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, High of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

module.exports = weather;
