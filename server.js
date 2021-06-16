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
  console.log(lat,lon,searchQuery);
  let locationWeatherData = weatherData.find(location => location.city_name === searchQuery);
  if (locationWeatherData === undefined){
    res.status(400).send('no weather for this location');
  }else {
    let locationRefactored = locationWeatherData.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, a High of ${obj.max_temp} with ${obj.weather.description}`));
    res.send(locationRefactored);
  }
});

class Forecast {
  constructor(date,description) {
    this.date = date;
    this.description= description;
  }
}





app.get('/*', (req,res) => {
  res.status(404).send('path not found');
});
app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});
