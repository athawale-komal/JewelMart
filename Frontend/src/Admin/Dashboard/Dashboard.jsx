import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findProducts } from '../../States/Products/Action';
import { getAllOrdersAdmin } from '../../States/Order/Action';
import { Gem, ShoppingBag, Users, IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(findProducts({}));
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);

  const stats = [
    { label: 'Total Revenue', value: `₹${orders?.reduce((acc, curr) => acc + (curr.totalDiscountPrice || 0), 0).toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', trend: '+12.5%', isUp: true },
    { label: 'Orders', value: orders?.length || 0, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', trend: '+5.2%', isUp: true },
    { label: 'Inventory', value: products?.length || 0, icon: Gem, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', trend: '-2.1%', isUp: false },
    { label: 'Active Users', value: '128', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', trend: '+8.1%', isUp: true },
  ];

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PLACED':
      case 'CONFIRMED': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'SHIPPED': return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'DELIVERED': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'CANCELLED': return 'bg-rose-50 text-rose-600 border border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 mb-0.5">Business Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 text-xs font-semibold shadow-sm">
          <Activity size={14} className="text-emerald-500" /> System Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                {stat.isUp ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Orders Preview */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Recent Transactions</h3>
            <button className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-100">
                {orders?.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">#{order._id?.slice(-6)}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{order.user?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-slate-700">₹{order.totalDiscountPrice?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan="3" className="py-16 text-center text-sm text-slate-400">No transactions yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Alert */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-5">Stock Alerts</h3>
          <div className="space-y-3">
            {products?.filter(p => p.stock < 5).slice(0, 4).map(p => (
              <div key={p._id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-rose-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0 overflow-hidden border border-slate-200">
                  <img src={p.images?.[0]} className="w-full h-full object-cover" alt={p.title} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate uppercase tracking-wide">{p.title}</p>
                  <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">{p.stock} Units Left</p>
                </div>
              </div>
            ))}
            {products?.filter(p => p.stock < 5).length === 0 && (
              <div className="py-12 text-center">
                <TrendingUp size={32} className="mx-auto text-emerald-200 mb-3" />
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">All Stock Healthy</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;