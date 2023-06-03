const router = require('express').Router();

const {
  editProfile,
  getCurrentUser,
} = require('../controllers/users');

const { validateEditUser } = require('../middlewares/validations');

router.get('/me', getCurrentUser);

router.patch('/me', validateEditUser, editProfile);

module.exports = router;
