
require('dotenv').config();
global.prod = require('./db')(function call(err, data) {
  // console.log(data)
  if(err) console.log(err);
  global.prod = data;
})

const cors = require("cors");
const express = require('express');
const nodemon = require('nodemon');
const { eventNames } = require('./models/User');
const app = express()
app.use(cors());
const port = process.env.PORT || 5001
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://main--yourpsyche.netlify.app/interview");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

// 1. Here we fetched in "Data" from file DB where we had static collection and stored it as global variable
// 2. Here we declared port name where our backend will be (5001)
// 3. Here we gave complete CORS counter module and mentioned our frontend port no.