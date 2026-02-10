const express = require ('express');
const router = express.Router();
const Cart_Controller = require  ('../Controllers/CartController.js');
const authenticate = require ('../Middleware/Authenticate.js')

router.get('/cart/get',authenticate, Cart_Controller.getUserCart);
router.put('/cart/add',authenticate, Cart_Controller.addItemToCart);
router.put('/cart/:id', authenticate, Cart_Controller.updateCartItem);
router.delete("/cart/:id", authenticate, Cart_Controller.removeCartItem)



module.exports = router