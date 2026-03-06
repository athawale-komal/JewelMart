import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, cancelOrder, deleteUserOrder } from "../States/Order/Action";
import {
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    MapPin,
    Calendar,
    IndianRupee,
    Loader2,
    ArrowLeft,
    ShieldCheck,
    Trash2,
    CreditCard,
    ShoppingBag
} from "lucide-react";
import { toast } from "react-toastify";

const OrderStatusStepper = ({ status }) => {
    const steps = [
        { name: "PLACED", icon: Clock, label: "Acquisition Placed" },
        { name: "CONFIRMED", icon: CheckCircle2, label: "Artesian Confirmed" },
        { name: "SHIPPED", icon: Truck, label: "In Transit" },
        { name: "DELIVERED", icon: Package, label: "Successfully Delivered" }
    ];

    const normalizedStatus = status === "PENDING" ? "PLACED" : status;
    const currentStep = steps.findIndex((s) => s.name === normalizedStatus);
    const isCancelled = status === "CANCELLED";

    if (isCancelled) {
        return (
            <div className="flex items-center gap-4 p-6 bg-red-500/5 border border-red-500/10 rounded-sm">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                    <h4 className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-red-500">Order Cancelled</h4>
                    <p className="text-[0.55rem] tracking-[0.1em] text-red-500/60 uppercase mt-1">This acquisition has been voided from our records.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-10 px-6">
            {/* Stepper Base Line */}
            <div className="absolute top-1/2 left-[calc(1.5rem+1.5rem)] right-[calc(1.5rem+1.5rem)] h-[1px] bg-[#2a2620] -translate-y-1/2 z-0">
                {/* Progress Line */}
                <div
                    className="h-full bg-[#d4af37] transition-all duration-1000"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
            </div>

            <div className="flex justify-between items-center relative z-10">

                {steps.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i <= currentStep;
                    const isCompleted = i < currentStep;

                    return (
                        <div key={s.name} className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-700 ${isActive
                                    ? "bg-[#d4af37] border-[#d4af37] text-[#0d0c0a] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                    : "bg-[#12100d] border-[#2a2620] text-[#3a3528]"
                                    }`}
                            >
                                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                            </div>
                            <div className="absolute -bottom-8 flex flex-col items-center min-w-[120px]">
                                <span className={`text-[0.55rem] tracking-[0.15em] font-bold uppercase ${isActive ? "text-[#d4af37]" : "text-[#3a3528]"}`}>
                                    {s.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderById(id));
    }, [dispatch, id]);

    const handleCancel = async () => {
        if (window.confirm("Are you sure you want to request cancellation of this order?")) {
            try {
                await dispatch(cancelOrder(id));
                toast.success("Cancellation request processed");
                dispatch(getOrderById(id));
            } catch (err) {
                toast.error("Failed to cancel order");
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm("This will move the items to your Archive and remove this order details. Continue?")) {
            try {
                await dispatch(deleteUserOrder(id));
                toast.success("Order moved to archive");
                navigate("/orders");
            } catch (err) {
                toast.error("Failed to archive order");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d0c0a] flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-[#d4af37] animate-spin" />
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#6a6050]">Synchronizing Repository...</p>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-32 pb-20 px-6 lg:px-14" style={{ fontFamily: "'Jost', sans-serif" }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <button
                        onClick={() => navigate("/orders")}
                        className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] hover:text-[#d4af37] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Return to Orders
                    </button>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[1px] bg-[#d4af37]" />
                                <span className="text-[0.65rem] tracking-[0.4em] uppercase text-[#d4af37] font-bold">Acquisition Ledger</span>
                            </div>
                            <h1 className="text-5xl font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Transaction #{order._id.slice(-12)}
                            </h1>
                            <p className="text-[#8a8070] text-[0.6rem] tracking-[0.2em] uppercase mt-2 flex items-center gap-4">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="w-1 h-1 rounded-full bg-[#3a3528]" />
                                <span className="bg-[#12100d] px-3 py-1 border border-[rgba(212,175,55,0.1)] text-[#d4af37]">{order.orderStatus}</span>
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {["PENDING", "PLACED"].includes(order.orderStatus) && (
                                <button
                                    onClick={handleCancel}
                                    className="px-8 py-4 border border-red-500/20 text-red-500/80 text-[0.6rem] tracking-[0.3em] uppercase font-bold hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Void Acquisition
                                </button>
                            )}
                            {order.orderStatus === "CANCELLED" && (
                                <button
                                    onClick={handleDelete}
                                    className="px-8 py-4 border border-[rgba(212,175,55,0.2)] text-[#6a6050] text-[0.6rem] tracking-[0.3em] uppercase font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center gap-2"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Move to Archive
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Progress & Items */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Stepper Card */}
                        <div className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] p-10 rounded-sm">
                            <h3 className="text-[0.65rem] tracking-[0.3em] uppercase text-[#6a6050] font-bold mb-10 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Logistic Progression
                            </h3>
                            <OrderStatusStepper status={order.orderStatus} />
                        </div>

                        {/* Items Section */}
                        <div className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] rounded-sm overflow-hidden">
                            <div className="p-8 border-b border-[rgba(212,175,55,0.05)]">
                                <h3 className="text-[0.65rem] tracking-[0.3em] uppercase text-[#6a6050] font-bold flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4 text-[#d4af37]" /> Artisan Collection
                                </h3>
                            </div>
                            <div className="divide-y divide-[rgba(212,175,55,0.05)]">
                                {order.orderItems?.map((item) => (
                                    <div key={item._id} className="p-8 flex gap-8 items-center group">
                                        <div className="w-24 aspect-[4/5] overflow-hidden border border-[rgba(212,175,55,0.1)] shrink-0">
                                            <img
                                                src={item.image || item.product?.image}
                                                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm tracking-[0.1em] uppercase font-light text-[#e8dfc8] mb-2">{item.title}</h4>
                                            <div className="flex flex-wrap gap-y-2 gap-x-6 text-[0.65rem] text-[#6a6050] tracking-[0.1em] uppercase">
                                                <span>Ref: {item.skuCode}</span>
                                                <span className="w-px h-3 bg-[rgba(212,175,55,0.1)]" />
                                                <span>Quantity: {item.quantity}</span>
                                                <span className="w-px h-3 bg-[rgba(212,175,55,0.1)]" />
                                                <span className="text-[#d4af37]">Valuation: ₹{item.discountedPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="space-y-12">
                        {/* Summary */}
                        <div className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] p-8 rounded-sm">
                            <h3 className="text-[0.65rem] tracking-[0.4em] uppercase text-[#d4af37] font-bold mb-8 flex items-center gap-3">
                                <CreditCard className="w-4 h-4" /> Final Valuation
                            </h3>
                            <div className="space-y-5 text-xs tracking-widest uppercase">
                                <div className="flex justify-between items-center text-[#6a6050]">
                                    <span>Artisan Value</span>
                                    <span>₹{order.totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-[#6a6050]">
                                    <span>Exclusive Benefit</span>
                                    <span className="text-emerald-500 font-medium">-₹{order.discount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-[#6a6050]">
                                    <span>Secure Logistics</span>
                                    <span className="text-emerald-500 font-medium">COMPLIMENTARY</span>
                                </div>
                                <div className="pt-6 mt-6 border-t border-[rgba(212,175,55,0.05)]">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[0.55rem] text-[#8a8070]">Total Payable</span>
                                            <span className="text-[0.5rem] tracking-[0.1em] text-[#3a3528]">Inclusive of all taxes</span>
                                        </div>
                                        <span className="text-3xl font-light text-[#e8dfc8]">₹{order.totalDiscountPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Trust Badges */}
                        <div className="space-y-4 px-4">
                            <div className="flex items-start gap-4 opacity-40 grayscale">
                                <Truck className="w-5 h-5 text-[#d4af37]" />
                                <p className="text-[0.55rem] tracking-widest uppercase leading-loose text-[#8a8070]">
                                    Insured transit overseen by Artisan Logistics division.
                                </p>
                            </div>
                            <div className="flex items-start gap-4 opacity-40 grayscale">
                                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                                <p className="text-[0.55rem] tracking-widest uppercase leading-loose text-[#8a8070]">
                                    Authenticity certification accompanying this unique acquisition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
