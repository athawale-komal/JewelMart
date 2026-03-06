import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, XCircle, Truck, MapPin, Calendar, IndianRupee, Loader2, Search, Trash2, ArrowRight, AlertCircle, ShoppingBag, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory, cancelOrder, deleteUserOrder } from '../States/Order/Action';
import { toast } from 'react-toastify';




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
                {/* Order Summary Card */}
                <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[rgba(212,175,55,0.05)]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Transaction ID</span>
                    <span className="text-sm font-medium text-[#d4af37]">#{order._id.slice(-12)}</span>
                    <span className="text-[0.55rem] tracking-[0.1em] text-[#4a4438] flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3" /> ACQUIRED ON {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Current Status</span>
                    <span className={`text-[0.65rem] tracking-[0.22em] font-bold uppercase mt-1 ${order.orderStatus === 'CANCELLED' ? 'text-red-500/60' : 'text-[#d4af37]'
                      }`}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="md:text-right flex flex-col justify-center">
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Valuation</span>
                    <div className="text-2xl font-light flex items-center md:justify-end gap-1">
                      <span className="text-sm font-bold">₹</span>
                      <span className="tracking-tighter">{order.totalDiscountPrice?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="px-8 py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.6rem] tracking-[0.3em] uppercase font-bold hover:bg-[#c49a22] transition-all flex items-center justify-center gap-2"
                    >
                      Trace Progress <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Simplified Item Preview */}
                <div className="px-8 py-6 bg-[rgba(212,175,55,0.02)] flex gap-4 overflow-x-auto scrollbar-hide">
                  {order.orderItems?.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 flex items-center gap-4 bg-[#0d0c0a] p-3 border border-[rgba(212,175,55,0.05)] rounded-sm">
                      <div className="w-12 h-12 overflow-hidden border border-[rgba(212,175,55,0.1)]">
                        <img
                          src={item.image || item.product?.image}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale-[0.5]"
                        />
                      </div>
                      <div className="pr-4">
                        <h4 className="text-[0.55rem] tracking-[0.1em] uppercase text-[#8a8070] truncate max-w-[120px]">{item.title}</h4>
                        <p className="text-[0.5rem] text-[#3a3528]">QTY: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
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
