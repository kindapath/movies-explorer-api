const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  const {
    _id: userId,
  } = req.user;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports.editProfile = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  const {
    _id: userId,
  } = req.user;

  User.findByIdAndUpdate(userId, { name, email }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          // token - наш JWT токен, который мы отправляем
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ email })
        .end();
    })
    .catch(next);
};
