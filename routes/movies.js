const router = require('express').Router();

const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateSaveMovie,
  validateMovieId,
} = require('../middlewares/validations');

router.get('/', getSavedMovies);

router.post('/', validateSaveMovie, saveMovie);

router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
