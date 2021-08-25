const express = require ('express');
const app = express();
require ('dotenv').config();
const cors = require ('cors');
const PORT = process.env.PORT || 3002;
app.use(cors());
const weatherData = require('./data/weather.json');

app.get('/', (req,res)=> {
  res.send('server is working');
});

app.get('/weather', (req,res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  //console the function variables
  console.log(lat,lon,searchQuery);
  //
  let locationWeatherData = weatherData.find(location => location.city_name === searchQuery);
  //
  if (locationWeatherData === undefined){
    res.status(400).send('no weather for this location');
  }else {
    // let locationRefactored = locationWeatherData.data.map(day => new Forecast(day)
    //   day.datetime, `Low of ${day.low_temp}, a High of ${day.max_temp} with ${day.weather.description}`
    // );
    // res.send(locationRefactored);
    const forcasts = locationWeatherData.data.map(day => {
      return new Forecast(day);
    });
    res.send(forcasts);
  }
});

class Forecast {
  constructor(day) {
    this.description= `Low of ${day.low_temp}, High of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}





app.get('*', (req,res) => {
  res.status(500).send('path not found');
});
app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});
