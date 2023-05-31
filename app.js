const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { errorHandler } = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('db is connected!'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server is running!');
});
