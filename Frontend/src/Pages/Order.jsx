import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, MapPin, Calendar, IndianRupee, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../States/Order/Action';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    dispatch(getOrderHistory());
  }, [dispatch, user, navigate]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'placed':
      case 'confirmed':
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'placed':
      case 'confirmed':
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full mb-4">
            <Package className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wide">ORDER HISTORY</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Orders
            </span>
          </h1>

          <p className="text-lg text-gray-600">
            Track and manage your jewelry purchases
          </p>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {(orders || []).map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-stone-100 bg-gradient-to-r from-amber-50 to-yellow-50">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.orderStatus)}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="h-6 w-px bg-stone-300"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Order #{order._id?.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(order.orderDate || order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-amber-600 flex items-center justify-end">
                        <IndianRupee className="w-5 h-5" />
                        {order.totalDiscountPrice?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {(order.orderItems || []).map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <img
                          src={item.image || item.product?.images?.[0] || item.product?.image}
                          alt={item.title || item.product?.title}
                          className="w-20 h-20 object-cover rounded-lg border border-stone-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title || item.product?.title}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 flex items-center">
                            <IndianRupee className="w-4 h-4" />
                            {item.discountedPrice?.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="mt-6 pt-6 border-t border-stone-100 grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">Shipping Address</p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress?.landmark}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {order.trackingNumber && (
                      <div>
                        <div className="flex items-start gap-2">
                          <Truck className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">Tracking Number</p>
                            <p className="text-sm text-gray-600 font-mono">{order.trackingNumber}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap gap-3">
                    <button
                      className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-semibold hover:bg-amber-100 transition-all"
                    >
                      View Details
                    </button>

                    {order.orderStatus === 'SHIPPED' && (
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100 transition-all">
                        Track Order
                      </button>
                    )}

                    {order.orderStatus === 'DELIVERED' && (
                      <button className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg font-semibold hover:bg-green-100 transition-all">
                        Review Product
                      </button>
                    )}

                    <button className="px-4 py-2 bg-stone-50 text-gray-700 border border-stone-200 rounded-lg font-semibold hover:bg-stone-100 transition-all">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;