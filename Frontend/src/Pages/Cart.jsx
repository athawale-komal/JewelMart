/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeCartItem, updateCartItem } from "../States/Cart/Action";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2, ShieldCheck, Package, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, cartItems, loading } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleUpdate = (cartItemId, quantity, change) => {
        const newQty = quantity + change;
        if (newQty >= 1) {
            dispatch(updateCartItem({ cartItemId, data: { quantity: newQty } }));
        }
    };

    const handleRemove = (cartItemId) => {
        dispatch(removeCartItem(cartItemId));
        toast.success("Item removed from cart");
    };

    if (loading && !cart) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
            </div>
        );
    }

    const items = cartItems || [];

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-rose-50 pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-widest">Your Cart</h1>
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <ShoppingBag size={56} className="text-slate-200 mb-5" />
                        <h2 className="text-xl font-bold text-slate-600 mb-2">Your cart is empty</h2>
                        <p className="text-slate-400 text-sm mb-8">Add some beautiful jewelry to get started.</p>
                        <button
                            onClick={() => navigate("/products")}
                            className="flex items-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-md shadow-amber-200 active:scale-95"
                        >
                            Explore Collection <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex gap-5 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group"
                                >
                                    {/* Image */}
                                    <div
                                        className="w-28 h-32 shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer"
                                        onClick={() => navigate(`/product/${item.product?._id}`)}
                                    >
                                        <img
                                            src={item.product?.images?.[0]}
                                            alt={item.product?.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between py-0.5">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h3
                                                    className="text-sm font-bold text-slate-800 uppercase tracking-wide hover:text-amber-600 cursor-pointer transition-colors"
                                                    onClick={() => navigate(`/product/${item.product?._id}`)}
                                                >
                                                    {item.product?.title}
                                                </h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                                    {item.product?.category}{item.product?.purity ? ` · ${item.product?.purity}` : ""}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item._id)}
                                                className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-center mt-3">
                                            {/* Quantity */}
                                            <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                                                <button
                                                    onClick={() => handleUpdate(item._id, item.quantity, -1)}
                                                    disabled={item.quantity <= 1 || loading}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-amber-500 hover:text-white transition-colors disabled:opacity-30"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-slate-800">
                                                    {loading ? <Loader2 size={12} className="animate-spin mx-auto" /> : item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdate(item._id, item.quantity, 1)}
                                                    disabled={loading}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-amber-500 hover:text-white transition-colors disabled:opacity-30"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-base font-bold text-amber-600">
                                                    ₹{(item.discountedPrice || item.price)?.toLocaleString()}
                                                </p>
                                                {item.discountedPrice && item.discountedPrice < item.price && (
                                                    <p className="text-[10px] text-slate-400 line-through">₹{item.price?.toLocaleString()}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 pb-4 border-b border-slate-100">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-semibold text-slate-700">₹{cart?.totalPrice?.toLocaleString()}</span>
                                    </div>
                                    {cart?.discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Discount</span>
                                            <span className="font-semibold text-emerald-600">− ₹{cart?.discount?.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Shipping</span>
                                        <span className="font-semibold text-emerald-600">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t border-b border-slate-100 mb-6">
                                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Total</span>
                                    <span className="text-2xl font-bold text-amber-600">₹{cart?.totalPayable?.toLocaleString()}</span>
                                </div>

                                {cart?.discount > 0 && (
                                    <div className="mb-5 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-700">
                                        🎉 You're saving ₹{cart?.discount?.toLocaleString()} on this order!
                                    </div>
                                )}

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-200 transition-all active:scale-[0.98]"
                                >
                                    Proceed to Checkout <ArrowRight size={18} />
                                </button>

                                {/* Trust */}
                                <div className="grid grid-cols-3 gap-2 mt-6">
                                    {[
                                        { icon: ShieldCheck, label: "Secure" },
                                        { icon: Package, label: "Insured" },
                                        { icon: RefreshCw, label: "Returns" },
                                    ].map(({ icon: Icon, label }) => (
                                        <div key={label} className="flex flex-col items-center gap-1">
                                            <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                                                <Icon size={15} className="text-amber-600" />
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
