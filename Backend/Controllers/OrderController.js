const OrderService = require("../Services/OrderService.js");

/* ================= CREATE ORDER ================= */

const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const shippingAddress = req.body.shippingAddress;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        error: "Shipping address required",
      });
    }

    const order = await OrderService.createOrder(user, shippingAddress);

    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= USER ORDERS ================= */

const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderService.userOrderHistory(req.user._id);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ================= GET SINGLE ORDER ================= */

const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.findOrderById(req.params.id);

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    return res.status(
      err.message === "Order not found" ? 404 : 500
    ).json({
      success: false,
      error: err.message,
    });
  }
};

/* ================= CANCEL ORDER (USER) ================= */

const cancelOrder = async (req, res) => {
  try {
    const order = await OrderService.findOrderById(req.params.id);

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    }

    // Prevent cancelling shipped/delivered orders
    if (["SHIPPED", "DELIVERED", "CANCELLED"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        error: "Order cannot be cancelled at this stage",
      });
    }

    const cancelledOrder = await OrderService.cancelOrder(req.params.id);

    return res.status(200).json({
      success: true,
      data: cancelledOrder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ================= ADMIN FUNCTIONS ================= */

/* GET ALL ORDERS */
const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrdersAdmin();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* UPDATE ORDER STATUS */
const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    let updatedOrder;

    switch (status) {
      case "PLACED":
        updatedOrder = await OrderService.placeOrder(req.params.id);
        break;
      case "CONFIRMED":
        updatedOrder = await OrderService.confirmOrder(req.params.id);
        break;
      case "SHIPPED":
        updatedOrder = await OrderService.shipOrder(req.params.id);
        break;
      case "DELIVERED":
        updatedOrder = await OrderService.deliverOrder(req.params.id);
        break;
      case "CANCELLED":
        updatedOrder = await OrderService.cancelOrder(req.params.id);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: "Invalid status",
        });
    }

    return res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* DELETE ORDER (ADMIN) */
const deleteOrder = async (req, res) => {
  try {
    const result = await OrderService.deleteOrderById(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    return res.status(
      err.message === "Order not found" ? 404 : 500
    ).json({
      success: false,
      error: err.message,
    });
  }
};

/* ================= ORDER ITEM HISTORY ================= */

const getOrderItemHistory = async (req, res) => {
  try {
    const history = await OrderService.getHistory(req.user);

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* DELETE ORDER ITEM FROM HISTORY */
const deleteOrderItem = async (req, res) => {
  try {
    const result = await OrderService.deleteOrderItem(
      req.params.itemId,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  deleteOrder,
  getOrderItemHistory,
  deleteOrderItem,
};