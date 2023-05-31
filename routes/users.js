const router = require('express').Router();

const {
  editProfile,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', editProfile);

module.exports = router;
