import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, XCircle, Truck, MapPin, Calendar, IndianRupee, Loader2, Search, Trash2, ArrowRight, AlertCircle, ShoppingBag, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory, cancelOrder, deleteUserOrder } from '../States/Order/Action';
import { toast } from 'react-toastify';

const OrderStatusStepper = ({ status }) => {
  const steps = [
    { name: 'PLACED', icon: Clock },
    { name: 'CONFIRMED', icon: CheckCircle2 },
    { name: 'SHIPPED', icon: Truck },
    { name: 'DELIVERED', icon: Package }
  ];

  const currentStep = steps.findIndex(s => s.name === status);
  const isCancelled = status === 'CANCELLED';

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-sm">
        <XCircle className="w-5 h-5 text-red-500" />
        <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-red-500">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full max-w-md my-6 relative">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2a2620] -translate-y-1/2 z-0" />
      <div
        className="absolute top-1/2 left-0 h-[1px] bg-[#d4af37] -translate-y-1/2 z-0 transition-all duration-1000"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i <= currentStep;
        return (
          <div key={s.name} className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive ? "bg-[#d4af37] border-[#d4af37] text-[#0d0c0a]" : "bg-[#12100d] border-[#2a2620] text-[#3a3528]"
              }`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className={`absolute -bottom-6 text-[0.5rem] tracking-[0.1em] font-medium whitespace-nowrap ${isActive ? "text-[#d4af37]" : "text-[#3a3528]"
              }`}>
              {s.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    dispatch(getOrderHistory());
  }, [dispatch, user, navigate]);

  const handleCancelOrder = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await dispatch(cancelOrder(id));
        toast.success("Order cancelled successfully");
      } catch (err) {
        toast.error("Failed to cancel order");
      }
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("This will move the items to your Order History and remove this order details. Continue?")) {
      try {
        await dispatch(deleteUserOrder(id));
        toast.success("Order moved to history");
      } catch (err) {
        toast.error("Failed to delete order");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const filteredOrders = orders?.filter(o =>
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.orderItems?.some(item => item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-32 pb-20 px-6 lg:px-14" style={{ fontFamily: "'Jost', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[rgba(212,175,55,0.1)] pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#d4af37]" />
              <span className="text-[0.65rem] tracking-[0.4em] uppercase text-[#d4af37] font-bold">Account Repository</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light italic mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              My Orders
            </h1>
            <p className="text-[#8a8070] text-sm tracking-widest uppercase flex items-center gap-3">
              Trace your acquisitions and artisan progress
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a3528] group-focus-within:text-[#d4af37] transition-colors" />
              <input
                type="text"
                placeholder="Search Order ID or Product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-4 bg-[#12100d] border border-[rgba(212,175,55,0.1)] text-xs tracking-widest uppercase outline-none focus:border-[rgba(212,175,55,0.4)] transition-all w-full md:w-80 rounded-sm"
              />
            </div>
            <button
              onClick={() => navigate('/order-history')}
              className="p-4 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.1)] hover:bg-[rgba(212,175,55,0.1)] transition-all"
              title="Archived History"
            >
              <History className="w-5 h-5 text-[#d4af37]" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-[#d4af37] animate-spin" />
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Fetching Repository...</p>
          </div>
        ) : !filteredOrders || filteredOrders.length === 0 ? (
          <div className="text-center py-32 bg-[#12100d]/50 border border-dashed border-[rgba(212,175,55,0.1)] rounded-sm">
            <ShoppingBag className="w-12 h-12 text-[#3a3528] mx-auto mb-6" />
            <h2 className="text-2xl font-light italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Repository Empty</h2>
            <p className="text-xs text-[#6a6050] tracking-widest uppercase mb-12">Universal acquisitions not found in this segment.</p>
            <button
              onClick={() => navigate('/products')}
              className="px-10 py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:shadow-2xl transition-all"
            >
              Discover Collections
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] group hover:border-[rgba(212,175,55,0.3)] transition-all duration-500 rounded-sm overflow-hidden">
                {/* Order Header */}
                <div className="p-8 border-b border-[rgba(212,175,55,0.05)] flex flex-col md:flex-row justify-between gap-6 relative">
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Order Identifier</span>
                    <span className="text-sm font-medium text-[#d4af37]">#{order._id}</span>
                    <span className="text-[0.55rem] tracking-[0.1em] text-[#4a4438] flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3" /> ACQUIRED ON {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex-1 max-w-lg">
                    <OrderStatusStepper status={order.orderStatus} />
                  </div>

                  <div className="md:text-right flex flex-col justify-center">
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Total Investment</span>
                    <div className="text-2xl font-light flex items-center md:justify-end gap-1">
                      <span className="text-sm font-bold">₹</span>
                      <span className="tracking-tighter">{order.totalDiscountPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-8 flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-center group/item pb-6 border-b border-[rgba(212,175,55,0.02)] last:border-0 last:pb-0">
                        <div className="relative cursor-pointer overflow-hidden aspect-[4/5] w-24 border border-[rgba(212,175,55,0.1)]">
                          <img
                            src={item.image || item.product?.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[0.5] group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-700"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs tracking-[0.2em] uppercase font-light mb-2">{item.title}</h4>
                          <div className="flex items-center gap-4 text-[0.65rem] text-[#6a6050]">
                            <span>Quantity: {item.quantity}</span>
                            <span className="w-1 h-1 rounded-full bg-[#3a3528]" />
                            <span className="text-[#d4af37]">₹{item.discountedPrice?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Actions */}
                  <div className="lg:w-80 space-y-8">
                    <div className="p-6 bg-[#0d0c0a] border border-[rgba(212,175,55,0.05)] rounded-sm">
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#d4af37] font-bold">Destination</span>
                      </div>
                      <p className="text-sm font-light mb-1">{order.shippingAddress?.name} {order.shippingAddress?.surname}</p>
                      <p className="text-xs text-[#8a8070] leading-relaxed">
                        {order.shippingAddress?.landmark}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => navigate(`/checkout`)} // Or specific tracking
                        className="w-full py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:bg-[#c49a22] transition-all flex items-center justify-center gap-2"
                      >
                        Trace Progress <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {['PENDING', 'PLACED'].includes(order.orderStatus) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="w-full py-4 border border-red-500/20 text-red-500/80 text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:bg-red-500 hover:text-white transition-all"
                        >
                          Request Cancellation
                        </button>
                      )}

                      {order.orderStatus === 'CANCELLED' && (
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="w-full py-4 border border-[rgba(212,175,55,0.2)] text-[#6a6050] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Move to Archive
                        </button>
                      )}
                    </div>
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
