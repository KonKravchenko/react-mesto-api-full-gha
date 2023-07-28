const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');
const { linkValid } = require('../utils/constants');

const {
  login, createUser, logout,
} = require('../controllers/users');

router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkValid),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
    .unknown(true),
}), createUser);
router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkValid),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
    .unknown(true),
}), login);

router.post('/api/logout', logout);

router.use(auth);
router.use('/api/users', userRoutes);
router.use('/api/cards', cardRoutes);
router.use('*', (req, res, next) => {
  throw new NotFoundError('Неверный путь');
});

module.exports = router;
