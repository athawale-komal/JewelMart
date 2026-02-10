const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const Authenticate = require('../Middleware/Authenticate');

router.get('/all-users',  UserController.getAllUser);
router.get('/profile',Authenticate, UserController.getUserProfile);
router.put('/update',Authenticate, UserController.updateProfile);

module.exports = router;