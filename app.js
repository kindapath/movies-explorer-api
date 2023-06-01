// packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

// import middlewares
const { errorHandler } = require('./errors/errorHandler');
const routes = require('./routes/index');

// app
const app = express();

// port
const { PORT = 3000 } = process.env;

// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('db is connected!'));

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server is running!');
});
