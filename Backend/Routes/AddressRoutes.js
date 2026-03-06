
const express = require('express');
const router = express.Router();
const AddressController = require('../Controllers/AddressController');
const authenticate = require('../Middleware/Authenticate');

router.post('/address/create', authenticate, AddressController.createAddress);
router.get('/address/all', authenticate, AddressController.getUserAddresses);
router.put('/address/update/:id', authenticate, AddressController.updateAddress);
router.delete('/address/delete/:id', authenticate, AddressController.deleteAddress);

module.exports = router;
