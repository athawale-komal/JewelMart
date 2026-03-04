
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin, updateOrderStatusAdmin, deleteOrderAdmin } from "../../States/Order/Action";
import { Search, Trash2, CheckCircle2, Truck, Package, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminOrders() {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getAllOrdersAdmin());
    }, [dispatch]);

    const handleStatusUpdate = (id, status) => {
        dispatch(updateOrderStatusAdmin(id, status));
        toast.info(`Order marked as ${status}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Permanently delete this order?")) {
            dispatch(deleteOrderAdmin(id));
            toast.success("Order deleted");
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case "PLACED":
            case "CONFIRMED": return "bg-blue-50 text-blue-600 border border-blue-100";
            case "SHIPPED": return "bg-amber-50 text-amber-600 border border-amber-100";
            case "DELIVERED": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
            case "CANCELLED": return "bg-rose-50 text-rose-600 border border-rose-100";
            default: return "bg-slate-50 text-slate-500 border border-slate-200";
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-xl font-bold text-slate-900 mb-0.5">Order Fulfillment</h1>
                <p className="text-slate-500 text-sm">Track and manage customer orders.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by ID or customer..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-3.5">Order</th>
                                <th className="px-6 py-3.5">Customer</th>
                                <th className="px-6 py-3.5 text-center">Items</th>
                                <th className="px-6 py-3.5 text-center">Total</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : !orders || orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center text-sm text-slate-400">No orders placed yet.</td>
                                </tr>
                            ) : orders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50/60 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">#{order._id?.slice(-8)}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-slate-800">{order.user?.name} {order.user?.surname}</span>
                                            <span className="text-xs text-slate-400">{order.user?.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium text-slate-600">{order.orderItems?.length} items</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-bold text-emerald-600">₹{order.totalDiscountPrice?.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusColor(order.orderStatus)}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex bg-slate-100 rounded-xl p-1 gap-0.5 border border-slate-200">
                                                {["CONFIRMED", "SHIPPED", "DELIVERED"].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleStatusUpdate(order._id, s)}
                                                        className={`p-1.5 rounded-lg transition-all ${order.orderStatus === s ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700 hover:bg-white'}`}
                                                        title={`Mark as ${s}`}
                                                    >
                                                        {s === "CONFIRMED" && <CheckCircle2 size={14} />}
                                                        {s === "SHIPPED" && <Truck size={14} />}
                                                        {s === "DELIVERED" && <Package size={14} />}
                                                    </button>
                                                ))}
                                            </div>
                                            <button onClick={() => handleDelete(order._id)} className="p-2 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-all border border-slate-200 hover:border-rose-200" title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
