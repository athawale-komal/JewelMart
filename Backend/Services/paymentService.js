const Payment = require("../models/Payment.js");
const razorpay = require("../config/PAYMENT.js");
const OrderService = require("../Services/OrderService.js");

const createPaymentLink = async (orderId) => {
  const order = await OrderService.findOrderById(orderId);

  if (!order) throw new Error("Order not found");
  if (!order.user) throw new Error("User not found");

  const mobile =
    order.user.mobile && String(order.user.mobile).length === 10
      ? String(order.user.mobile)
      : "9989905678";

  const paymentLink = await razorpay.paymentLink.create({
    amount: order.totalDiscountPrice * 100,
    currency: "INR",
    customer: {
      name: `${order.user.firstName || "Customer"} ${order.user.lastName || ""}`,
      email: order.user.email,
      contact: mobile
    },
    notify: { sms: true, email: true },
    reminder_enable: true,
    callback_url: `http://localhost:5173/payment-success?orderId=${orderId}`,
    callback_method: "get"

  });

  await Payment.create({
    orderId,
    paymentLinkId: paymentLink.id,
    amount: order.totalDiscountPrice,
    status: "PENDING",
    shortUrl: paymentLink.short_url
  });

  return {
    paymentLinkId: paymentLink.id,
    paymentUrl: paymentLink.short_url
  };
};

const updatePaymentInformation = async (query) => {
  const razorpay_payment_id = query.razorpay_payment_id || query.payment_id;
  const razorpay_payment_link_id = query.razorpay_payment_link_id || query.payment_link_id;
  const razorpay_payment_link_status = query.razorpay_payment_link_status || query.payment_link_status || query.status;
  const orderId = query.orderId;

  if (!orderId) throw new Error("Order ID missing in callback");

  // Allow both "paid" (Razorpay) and "SUCCESS" (Our mapping)
  if (razorpay_payment_link_status !== "paid" && razorpay_payment_link_status !== "SUCCESS" && razorpay_payment_link_status !== "completed") {
    // If it's a redirect from Razorpay, it should be "paid"
    // If it's a manual status update or specific mapping, handle it
  }

  // 1️⃣ Update Payment collection
  await Payment.findOneAndUpdate(
    {
      orderId: orderId,
      paymentLinkId: razorpay_payment_link_id
    },
    {
      paymentId: razorpay_payment_id,
      status: "COMPLETED"
    }
  );

  // 2️⃣ Update Order
  const order = await OrderService.findOrderById(orderId);

  order.orderStatus = "CONFIRMED";
  order.paymentDetails = {
    paymentId: razorpay_payment_id,
    paymentStatus: "SUCCESS"
  };

  await order.save();

  // 3️⃣ Clear cart ONLY now
  if (order.user) {
    const CartService = require("../Services/CartService.js");
    await CartService.clearCart(order.user._id);
  }

  return { success: true, message: "Payment successful" };
};


module.exports = {
  createPaymentLink,
  updatePaymentInformation
};
