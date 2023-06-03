const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');

module.exports.getSavedMovies = (req, res, next) => {
  const {
    _id: userId,
  } = req.user;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.saveMovie = (req, res, next) => {
  const {
    _id: userId,
  } = req.user;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner: userId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные при сохранении фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const {
    id,
  } = req.params;
  const {
    _id: userId,
  } = req.user;

  Movie.findById(id)
    .orFail(() => {
      throw new NotFoundError('Такой фильм не найден или вы его не сохраняли.');
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        return movie.deleteOne().then(() => res.send(movie));
      }
      throw new ForbiddenError('Нет доступа.');
    })
    .catch(next);
};
