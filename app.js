// packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

// import middlewares
const { errorHandler } = require('./errors/errorHandler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

// import constants
const { allowedCors } = require('./constant/constants');

// app
const app = express();

// port
const { PORT = 3000 } = process.env;

// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(limiter);

// cors
app.options('*', cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

// routes
app.use(requestLogger);
app.use(routes);

// errors
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// port
app.listen(PORT, () => { });
