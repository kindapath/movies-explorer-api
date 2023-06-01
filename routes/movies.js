const router = require('express').Router();

const {
  getSavedMovies,
  saveMovie,
  // deleteCard,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.post('/', saveMovie); // add validationSaveCard middleware

// router.delete('/:movieId', deleteCard);

module.exports = router;
