const router = require('express').Router();

const {
  getSavedMovies,
  createMovie,
  deleteCard,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.post('/', createMovie);

router.delete('/:movieId', deleteCard);

module.exports = router;
