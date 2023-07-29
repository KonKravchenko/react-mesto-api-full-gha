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
// const cors = require('cors')
const router = require('./routes');
// const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');

// app.use(cors);

const allowedCors = [
  'https://konkravchenko.nomoreparties.sbs',
  'https://konkravchenko.nomoreparties.sbs/',
  'https://konkravchenko.nomoreparties.sbs/sign-in',
  'https://konkravchenko.nomoreparties.sbs/sign-up',
  'https://konkravchenko.nomoreparties.sbs/main',
  'http://konkravchenko.nomoreparties.sbs',
  'http://konkravchenko.nomoreparties.sbs/',
  'http://konkravchenko.nomoreparties.sbs/sign-in',
  'http://konkravchenko.nomoreparties.sbs/sign-up',
  'http://konkravchenko.nomoreparties.sbs/main',
  'https://localhost:3000',
  'https://localhost:3000/',
  'https://localhost:3000/sign-in',
  'https://localhost:3000/sign-up',
  'https://localhost:3000/main',
  'http://localhost:3000',
  'http://localhost:3000/',
  'http://localhost:3000/sign-in',
  'http://localhost:3000/sign-up',
  'http://localhost:3000/main',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  console.log(req.headers);
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  next();
}
)

mongoose.connect(DB);
// mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);// подключаем логгер запросов

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log('Сервер запущен!', SERVER_PORT);
});
