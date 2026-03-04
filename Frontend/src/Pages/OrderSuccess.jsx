
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

export default function OrderSuccess() {
    const navigate = useNavigate();
    const { order } = useSelector((state) => state.order);

    return (
        <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-32 pb-12" style={{ fontFamily: "'Jost', sans-serif" }}>
            <div className="max-w-3xl mx-auto px-6 text-center">
                <div className="relative inline-block mb-10">
                    <div className="absolute inset-0 bg-[#d4af37] opacity-20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                    <CheckCircle2 className="w-24 h-24 text-[#d4af37] relative z-10 stroke-[1px]" />
                    <Sparkles className="absolute -top-4 -right-4 text-[#d4af37] w-8 h-8 animate-bounce" />
                </div>

                <h1 className="text-5xl font-light italic tracking-widest uppercase mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Success
                </h1>
                <p className="text-[0.7rem] tracking-[0.4em] uppercase text-[#6a6050] mb-12">
                    Your piece of luxury is being prepared
                </p>

                <div className="bg-[#12100d] border border-[rgba(212,175,55,0.15)] p-10 mb-12 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-[0.03] -mr-16 -mt-16 rotate-45"></div>

                    <div className="grid grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#4a4438] mb-1.5 flex items-center gap-2">
                                    <Package className="w-3 h-3" /> Order ID
                                </p>
                                <p className="text-sm font-medium tracking-widest text-[#d4af37]">#{order?._id?.slice(-8).toUpperCase() || "JWM-9283-DX"}</p>
                            </div>
                            <div>
                                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#4a4438] mb-1.5 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Placed On
                                </p>
                                <p className="text-sm">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#4a4438] mb-1.5 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> Shipping To
                                </p>
                                <p className="text-sm line-clamp-2">{order?.shippingAddress?.city || "Your Destination"}, {order?.shippingAddress?.state || "India"}</p>
                            </div>
                            <div>
                                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#4a4438] mb-1.5">Total Amount</p>
                                <p className="text-xl font-bold text-[#d4af37]">₹{order?.totalDiscountPrice?.toLocaleString() || "..."}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => navigate("/orders")}
                        className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[rgba(212,175,55,0.3)] text-[#e8dfc8] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:bg-[rgba(212,175,55,0.05)] transition-all flex items-center justify-center gap-3"
                    >
                        View Orders
                    </button>
                    <button
                        onClick={() => navigate("/products")}
                        className="w-full sm:w-auto px-10 py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all flex items-center justify-center gap-3"
                    >
                        Continue Shopping <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <p className="mt-16 text-[0.55rem] tracking-[0.3em] uppercase text-[#3a3528]">
                    A confirmation email has been dispatched to your registered address.
                </p>
            </div>
        </div>
    );
}
