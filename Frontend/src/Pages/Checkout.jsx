/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../States/Cart/Action";
import { createOrder } from "../States/Order/Action";
import { createPayment } from "../States/Payment/Action";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../States/Address/Action";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus, Check, ArrowLeft, Loader2, ShieldCheck, Truck, CreditCard, Trash2, Home, Briefcase, Pencil, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function Checkout() {
    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [newAddressForm, setNewAddressForm] = useState({
        name: "", surname: "", email: "", mobile: "",
        landmark: "", city: "", state: "", pincode: "", country: "India"
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Safety checks for state selection
    const { cart, cartItems } = useSelector((state) => state.cart || { cart: {}, cartItems: [] });
    const { user } = useSelector((state) => state.auth || {});
    const addressState = useSelector((state) => state.address || { addresses: [], loading: false });
    const { addresses = [], loading: addressLoading = false } = addressState;
    const orderState = useSelector((state) => state.order || { loading: false });
    const paymentState = useSelector((state) => state.payment || { loading: false });

    useEffect(() => {
        dispatch(getCart());
        dispatch(getAddresses());
    }, [dispatch]);

    // Error handling with toasts
    const orderError = useSelector(state => state.order?.error);
    const paymentError = useSelector(state => state.payment?.error);

    useEffect(() => {
        if (orderError) toast.error(orderError);
        if (paymentError) toast.error(paymentError);
    }, [orderError, paymentError]);

    const handleAddressInputChange = (e) => {
        setNewAddressForm({ ...newAddressForm, [e.target.name]: e.target.value });
    };

    const handleCreateAddress = async (e) => {
        e.preventDefault();
        try {
            if (editingAddressId) {
                await dispatch(updateAddress(editingAddressId, newAddressForm));
                toast.success("Address updated successfully");
            } else {
                const created = await dispatch(createAddress(newAddressForm));
                setSelectedAddress(created);
                toast.success("Address added successfully");
            }
            setShowAddressForm(false);
            setEditingAddressId(null);
            setNewAddressForm({
                name: "", surname: "", email: "", mobile: "",
                landmark: "", city: "", state: "", pincode: "", country: "India"
            });
        } catch (err) {
            toast.error(editingAddressId ? "Failed to update address" : "Failed to add address");
        }
    };

    const handleEditAddress = (e, addr) => {
        e.stopPropagation();
        setNewAddressForm(addr);
        setEditingAddressId(addr._id);
        setShowAddressForm(true);
    };

    const handleCancelForm = () => {
        setShowAddressForm(false);
        setEditingAddressId(null);
        setNewAddressForm({
            name: "", surname: "", email: "", mobile: "",
            landmark: "", city: "", state: "", pincode: "", country: "India"
        });
    };

    const handleDeleteAddress = (e, id) => {
        e.stopPropagation();
        if (selectedAddress?._id === id) setSelectedAddress(null);
        dispatch(deleteAddress(id));
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }

        try {
            const created = await dispatch(createOrder({ shippingAddress: selectedAddress }));
            if (created && created._id) {
                const payment = await dispatch(createPayment(created._id));
                if (payment && payment.paymentUrl) {
                    window.location.href = payment.paymentUrl;
                }
            }
        } catch (err) {
            console.error("Order conversion failed", err);
        }
    };

    const inp = "w-full bg-[#0d0c0a] border border-[rgba(212,175,55,0.1)] px-5 py-4 text-sm text-[#e8dfc8] focus:border-[rgba(212,175,55,0.4)] outline-none transition-all rounded-sm placeholder-[#3a3528]";

    return (
        <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-32 pb-20 px-6 lg:px-14" style={{ fontFamily: "'Jost', sans-serif" }}>
            <div className="max-w-7xl mx-auto">
                {/* Stepper Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-[rgba(212,175,55,0.1)] -translate-y-1/2 hidden md:block z-0" />
                    {[
                        { num: 1, label: "Shipping", sub: "Destination" },
                        { num: 2, label: "Review", sub: "Order Summary" },
                        { num: 3, label: "Payment", sub: "Complete Purchase" }
                    ].map((s) => (
                        <div key={s.num} className={`relative z-10 flex items-center gap-4 px-8 py-4 rounded-full border transition-all duration-500 ${step >= s.num ? "bg-[#d4af37] border-[#d4af37] text-[#0d0c0a]" : "bg-[#0d0c0a] border-[rgba(212,175,55,0.2)] text-[#6a6050]"
                            }`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s.num ? "bg-[#0d0c0a] text-[#d4af37]" : "bg-[#12100d] text-[#3a3528]"
                                }`}>{s.num}</span>
                            <div className="flex flex-col">
                                <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold">{s.label}</span>
                                <span className={`text-[0.5rem] tracking-widest uppercase ${step >= s.num ? "text-[rgba(13,12,10,0.6)]" : "text-[#3a3528]"}`}>{s.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Flow */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Step 1: Destination */}
                        <div className={`transition-all duration-700 ${step === 1 ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Shipping Destination</h2>
                                {step > 1 && (
                                    <button onClick={() => setStep(1)} className="text-[0.6rem] tracking-[0.3em] uppercase text-[#d4af37] hover:underline">Change Address</button>
                                )}
                            </div>

                            <div className="space-y-6">
                                {showAddressForm ? (
                                    <form onSubmit={handleCreateAddress} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#12100d] p-8 border border-[rgba(212,175,55,0.1)] rounded-sm">
                                        <div className="col-span-2 mb-2">
                                            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Personal Details</p>
                                        </div>
                                        <input name="name" placeholder="First Name" value={newAddressForm.name} onChange={handleAddressInputChange} required className={inp} />
                                        <input name="surname" placeholder="Last Name" value={newAddressForm.surname} onChange={handleAddressInputChange} required className={inp} />
                                        <input name="email" type="email" placeholder="Email Address" value={newAddressForm.email} onChange={handleAddressInputChange} required className={inp} />
                                        <input name="mobile" placeholder="Mobile Number" value={newAddressForm.mobile} onChange={handleAddressInputChange} required className={inp} />

                                        <div className="col-span-2 mt-4 mb-2">
                                            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Delivery Address</p>
                                        </div>
                                        <div className="col-span-2">
                                            <input name="landmark" placeholder="Building, Street, Area" value={newAddressForm.landmark} onChange={handleAddressInputChange} required className={inp} />
                                        </div>
                                        <input name="city" placeholder="City" value={newAddressForm.city} onChange={handleAddressInputChange} required className={inp} />
                                        <input name="state" placeholder="State" value={newAddressForm.state} onChange={handleAddressInputChange} required className={inp} />
                                        <input name="pincode" placeholder="Pincode" value={newAddressForm.pincode} onChange={handleAddressInputChange} required className={inp} />
                                        <input name="country" placeholder="Country" value="India" readOnly className={inp} />

                                        <div className="col-span-2 flex gap-4 mt-8">
                                            <button type="submit" className="flex-1 py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:bg-[#c49a22] transition-all">
                                                {editingAddressId ? "Update Address" : "Save & Deliver Here"}
                                            </button>
                                            <button type="button" onClick={handleCancelForm} className="flex-1 py-4 border border-[rgba(212,175,55,0.2)] text-[#e8dfc8] text-[0.65rem] tracking-[0.3em] uppercase hover:bg-[rgba(212,175,55,0.05)]">Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {addresses?.map((addr) => (
                                            <div
                                                key={addr._id}
                                                onClick={() => setSelectedAddress(addr)}
                                                className={`p-6 border transition-all cursor-pointer relative group rounded-sm ${selectedAddress?._id === addr._id
                                                    ? "border-[#d4af37] bg-[rgba(212,175,55,0.05)]"
                                                    : "border-[rgba(212,175,55,0.1)] bg-[#12100d] hover:border-[rgba(212,175,55,0.3)]"
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className={`w-4 h-4 ${selectedAddress?._id === addr._id ? "text-[#d4af37]" : "text-[#3a3528]"}`} />
                                                        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#d4af37]">Saved Address</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button
                                                            onClick={(e) => handleEditAddress(e, addr)}
                                                            className="p-1.5 hover:bg-[#d4af37]/10 rounded-full text-[#6a6050] hover:text-[#d4af37]"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDeleteAddress(e, addr._id)}
                                                            className="p-1.5 hover:bg-red-500/10 rounded-full text-[#6a6050] hover:text-red-500"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-lg font-light mb-1">{addr.name} {addr.surname}</p>
                                                <p className="text-sm text-[#8a8070] truncate">{addr.landmark}</p>
                                                <p className="text-sm text-[#8a8070] mb-6">{addr.city}, {addr.state} - {addr.pincode}</p>

                                                {selectedAddress?._id === addr._id && step === 1 && (
                                                    <button
                                                        onClick={() => setStep(2)}
                                                        className="w-full py-3 bg-[#d4af37] text-[#0d0c0a] text-[0.6rem] tracking-[0.2em] uppercase font-bold hover:bg-[#c49a22] transition-all"
                                                    >
                                                        Deliver to this address
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => setShowAddressForm(true)}
                                            className="p-6 border border-dashed border-[rgba(212,175,55,0.2)] bg-transparent hover:bg-[rgba(212,175,55,0.02)] transition-all flex flex-col items-center justify-center gap-4 text-[#8a8070] hover:text-[#d4af37] rounded-sm group min-h-45"
                                        >
                                            <div className="w-12 h-12 rounded-full border border-[rgba(212,175,55,0.1)] flex items-center justify-center group-hover:border-[#d4af37] transition-all">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                            <span className="text-[0.65rem] tracking-[0.3em] uppercase font-bold">Add New Destination</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 2: Review Order */}
                        <div className={`transition-all duration-700 ${step === 2 ? "opacity-100" : (step > 2 ? "opacity-40" : "opacity-0 pointer-events-none")}`}>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Artisan Collection Review</h2>
                            </div>

                            <div className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] rounded-sm overflow-hidden">
                                {cartItems?.map((item) => (
                                    <div key={item._id} className="p-6 border-b border-[rgba(212,175,55,0.05)] last:border-0 flex gap-6 items-center">
                                        <div className="w-20 aspect-4/5 overflow-hidden border border-[rgba(212,175,55,0.1)]">
                                            <img src={item.product?.images[0]} className="w-full h-full object-cover grayscale-[0.3]" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm tracking-widest uppercase font-light text-[#e8dfc8]">{item.product?.title}</h4>
                                            <p className="text-[0.65rem] text-[#8a8070] tracking-widest uppercase mt-1">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#d4af37] font-medium text-sm">₹{item.discountedPrice?.toLocaleString()}</p>
                                            <p className="text-[0.6rem] text-[#3a3528] line-through">₹{item.price?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {step === 2 && (
                                <div className="flex gap-6 mt-8">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-5 border border-[rgba(212,175,55,0.2)] text-[#e8dfc8] text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:bg-[rgba(212,175,55,0.05)] transition-all flex items-center justify-center gap-3"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to Shipping
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex-2 py-5 bg-[#d4af37] text-[#0d0c0a] text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all flex items-center justify-center gap-3"
                                    >
                                        Proceed to Secure Payment <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Step 3: Payment */}
                        <div className={`transition-all duration-700 ${step === 3 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <h2 className="text-3xl font-light italic mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Settlement Gateway</h2>

                            <div className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] p-10 rounded-sm text-center">
                                <CreditCard className="w-12 h-12 text-[#d4af37] mx-auto mb-6 opacity-40" />
                                <h3 className="text-xl font-light mb-4">Secured via Razorpay</h3>
                                <p className="text-xs text-[#8a8070] leading-relaxed max-w-sm mx-auto mb-10 tracking-widest uppercase">
                                    You will be redirected to our encrypted settlement portal to complete your acquisition with Artisan Security protocols.
                                </p>

                                <div className="flex gap-6">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="flex-1 py-5 border border-[rgba(212,175,55,0.2)] text-[#e8dfc8] text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:bg-[rgba(212,175,55,0.05)] transition-all"
                                    >
                                        Back to Review
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={paymentState.loading || orderState.loading}
                                        className="flex-2 py-5 bg-[#d4af37] text-[#0d0c0a] text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {(paymentState.loading || orderState.loading) ? <Loader2 className="animate-spin w-5 h-5" /> : "Authorize Payment Session"}
                                    </button>
                                </div>

                                <div className="mt-12 opacity-30 flex items-center justify-center gap-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4 invert" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-40 space-y-8">
                            <div className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] p-8 rounded-sm">
                                <h3 className="text-[0.65rem] tracking-[0.4em] uppercase text-[#d4af37] font-bold mb-8 flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4" /> Investment Summary
                                </h3>

                                <div className="space-y-4 text-xs tracking-widest uppercase">
                                    <div className="flex justify-between items-center text-[#6a6050]">
                                        <span>Artisan Value</span>
                                        <span>₹{cart?.totalPrice?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[#6a6050]">
                                        <span>Exclusive Benefit</span>
                                        <span className="text-emerald-500 font-medium">-₹{cart?.discount?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[#6a6050]">
                                        <span>Curated Delivery</span>
                                        <span className="text-emerald-500 font-medium">COMPLIMENTARY</span>
                                    </div>
                                    <div className="pt-6 mt-6 border-t border-[rgba(212,175,55,0.05)]">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[0.55rem] text-[#8a8070]">Total Contribution</span>
                                            <span className="text-2xl font-light text-[#e8dfc8]">₹{cart?.totalPayable?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 grayscale opacity-40">
                                    <Truck className="w-5 h-5 text-[#d4af37]" />
                                    <p className="text-[0.55rem] tracking-widest uppercase leading-loose text-[#8a8070]">Expedited insured transit provided globally by Artisan Logistics.</p>
                                </div>
                                <div className="flex items-start gap-4 p-4 grayscale opacity-40">
                                    <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                                    <p className="text-[0.55rem] tracking-widest uppercase leading-loose text-[#8a8070]">Authenticity certification issued with every acquisition in this segment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
