const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const Authenticate = require('../Middleware/Authenticate')
const { upload } = require('../Config/cloudinary');
const admin = require('../Middleware/admin');



router.post('/auth/signup', upload.single('photo'), AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/forgot-password', AuthController.forgotPassword);
router.post('/auth/reset-password', AuthController.resetPassword);
router.get('/user/users', Authenticate, admin('ADMIN'), AuthController.getAllUsers);
router.get('/user/profile', Authenticate, AuthController.getUserProfile);
router.put('/user/update', Authenticate, AuthController.updateProfile);

module.exports = router;