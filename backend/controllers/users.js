/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const BadRequestError = require('../errors/bad-request-err');

const SALT_ROUNDS = 10;
const { SECRET_STRING } = require('../utils/config');

// const JWT_SECRET = 'somethingverysecret';
// const { JWT_SECRET } = process.env;
// NODE_ENV === 'production' ? SECRET_STRING : 'dev-secret'
const logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
  // const { email } = req.body;
  // User.findOne({ email })
  //   .then((user) => {
  //     const token = jwt.sign({ id: user._id }, SECRET_STRING);
  //     res
  //       .cookie('jwt', token, {
  //         maxAge: 0,
  //         httpOnly: true,
  //         sameSite: true,
  //       })
  //       .send({ id: user._id });
  //   })
  //   .catch((error) => {
  //     throw new UnauthorizedError('Неверный имя пользователя или пароль');
  //   })
  //   .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный имя пользователя или пароль');
      }
      bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            throw new UnauthorizedError('Неверный имя пользователя или пароль');
          } else {
            const token = jwt.sign({ id: user._id }, SECRET_STRING);
            res
              .cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
              })
              .send({ id: user._id });
          }
        }).catch(next);
    })
    .catch(next);
  //   bcrypt.compare(password, user.password, (err, isValidPassword) => {
  //     if (!isValidPassword) {
  //       throw new UnauthorizedError('Неверный имя пользователя или пароль');
  //     } else {
  //       const token = jwt.sign({ id: user._id }, SECRET_STRING);
  //       res
  //         .cookie('jwt', token, {
  //           maxAge: 3600000 * 24 * 7,
  //           httpOnly: true,
  //           sameSite: true,
  //         })
  //         .send({ id: user._id });
  //     }
  //   });
  // })
  // .catch((error) => {
  //   throw new UnauthorizedError('Неверный имя пользователя или пароль');
  // })
  // .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((data) => {
        res
          .status(201)
          .send({
            name, about, avatar, email,
          });
      })
      // .catch((err) => {
      //   if (err.code === 11000) {
      //     throw new ConflictingRequestError('Пользователь с таким Email уже зарегестрирован');
      //   }
      // })
      // .catch(next);
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Некорректые данные при создании карточки'));
        } else if (err.code === 11000) {
          next(new ConflictingRequestError('Пользователь с таким Email уже зарегестрирован'));
        } else {
          next(err);
        }
      });
  });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res
        .status(200)
        .send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
  // .catch(next);
};

// const getAuthUser = (req, res, next) => {
//   const { id } = req.user;
//   User.findById(id)
//     .then((user) => {
//       User.findOne(user)
//         .then((data) => {
//           res.status(200).send(data);
//         });
//     })
//     .catch(next);
// };

const getAuthUser = (req, res, next) => {
  const { id } = req.user;
  console.log(req);
  User.findById(id)
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch(next);
};

const changeProfileData = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    {
      new: true,
    },
  )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    // .catch(next);
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректые данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const changeProfileNameAbout = (req, res) => {
  changeProfileData(req, res);
};

const changeProfileAvatar = (req, res) => {
  changeProfileData(req, res);
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUser,
  changeProfileNameAbout,
  changeProfileAvatar,
  getAuthUser,
  logout,
};
