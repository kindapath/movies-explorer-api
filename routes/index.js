const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');

const { login, createUser } = require('../controllers/users');

router.post('/signup', createUser);

router.post('/signin', login);

router.use('/users', routerUsers);

router.use('/movies', routerMovies);

module.exports = router;
