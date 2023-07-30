const Card = require('../models/card');
const ForbidenError = require('../errors/forbiden-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = { _id: req.user.id };
  Card.create({ name, link, owner })
    .then((card) => {
      res
        .status(201)
        .send(card);
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

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  const userId = req.user.id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId)
          .then((data) => {
            res
              .status(200)
              .send({ data, message: 'Карточка удалена' });
          })
          .catch(next);
      } else {
        throw new ForbidenError('У вас нет прав на удаление данной карточки');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    // .catch((err) => {
    //   if (err.message === 'NotValidId') {
    //     throw new NotFoundError('Карточка не найдена');
    //   }
    // })
    // .catch(next);
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    // .catch((err) => {
    //   if (err.message === 'NotValidId') {
    //     throw new NotFoundError('Карточка не найдена');
    //   }
    // })
    // .catch(next);
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};
