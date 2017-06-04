const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, (err, res) => {
  if (err) {
    console.log(`DB Connection failed: ${err}`);
  } else {
    console.log('DB Connection Success');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;

