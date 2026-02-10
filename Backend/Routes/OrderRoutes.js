const express = require("express");
const authenticate = require("../Middleware/Authenticate.js");
const admin = require("../Middleware/admin.js");
const OrderController = require("../Controllers/OrderController.js");

const router = express.Router();


// Get order item history (USER + ADMIN)
router.get("/orders/history", authenticate, OrderController.getOrderItemHistory);

// Delete single order item from history (soft delete)
router.delete("/order/history/:itemId",authenticate,OrderController.deleteOrderItem);

// Get logged-in user's orders
router.get("/orders/my-orders", authenticate, OrderController.getUserOrders);

// Create order from cart
router.post("/order/create", authenticate, OrderController.createOrder);

// Cancel own order
router.put("/order/cancel/:id", authenticate, OrderController.cancelOrder);

/* ================= ADMIN ================= */

// Get all orders
router.get("/orders/admin-orders",authenticate,admin("ADMIN"),OrderController.getAllOrdersAdmin);

// Update order status
router.put("/order/status/:id",authenticate,admin("ADMIN"),OrderController.updateOrderStatusAdmin);

// Delete order (admin only)
router.delete("/order/delete/:id",authenticate,admin("ADMIN"),OrderController.deleteOrder
);

/* ================= SINGLE ORDER ================= */

// Get order by ID (KEEP LAST)
router.get("/order/:id", authenticate, OrderController.getOrderById);

module.exports = router;