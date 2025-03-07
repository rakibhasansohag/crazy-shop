const {
	registerUser,
	login,
} = require('../../controllers/auth/auth-controller');

const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;
