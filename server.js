const express = require ('express');
const app = express;
require ('dotenv').config();
const cors = require ('cors');
const PORT = process.env.PORT;
app.use(cors());
const weatherData = require('./data/weather.json');
// app.get('/weather', (req,res) => {
//   let getWeather = req.query.
//   res.send(weatherData);
// });





app.get('/*', (req,res) => {
  res.status(404).send('path not found');
});
app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});
