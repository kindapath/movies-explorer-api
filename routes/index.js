const router = require('express').Router();

const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validations');

const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли из аккаунта.' });
});

router.use('/users', auth, routerUsers);

router.use('/movies', auth, routerMovies);

router.use('*', auth, (req, res, next) => next(new NotFoundError('Некорректный путь или запрос.')));

module.exports = router;
