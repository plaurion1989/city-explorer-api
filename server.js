const express = require ('express');
const app = express;
require ('dotenv').config();
const cors = require ('cors');
const PORT = process.env.PORT;
app.use(cors());

app.get('/', (req,res) => {
  let location = req.query.location;
  res.send(location);
});





app.get('/*', (req,res) => {
  res.status(404).send('path not found');
});
app.listen(PORT, () => {console.log(`listening on ${PORT}`)});