/* eslint-disable */

// konkravchenko.nomoreparties.sbs
// api.konkravchenko.nomoreparties.sbs
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const errorHandler = require('./middlewares/error-handler');

const app = express();

const router = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');
// require('dotenv').config();

// console.log(process.env.NODE_ENV); // production

app.use(cors);

mongoose.connect(DB);
// mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);// подключаем логгер запросов

app.use('https://api.konkravchenko.nomoreparties.sbs', router);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log('Сервер запущен!');
});
