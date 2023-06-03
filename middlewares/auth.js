const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/authentication-err');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const handleAuthError = (next) => next(new AuthenticationError('Необходимо авторизироваться'));

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!jwt) {
    return handleAuthError(next);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};
