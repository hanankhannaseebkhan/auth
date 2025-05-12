const { Signup, Login } = require('../Controllers/AuthController');
const router = require('express').Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post('/signup', Signup);
router.post('/login', Login);

// Protected route
router.post('/protected', userVerification, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', username: req.user.username });
});

module.exports = router;
