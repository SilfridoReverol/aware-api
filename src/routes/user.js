const router = require('express').Router();
const user = require('../controllers/userController');

router.get('/user', user.getUser);

router.get('/:userId', user.getUserById);

router.post('/signup', user.createUser);

router.post('/signin', user.login);

router.delete('/:userId', user.deleteUserById);

module.exports = router;
