
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../States/Cart/Action";
import { createOrder } from "../States/Order/Action";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus, Check, ArrowLeft, Loader2, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { toast } from "react-toastify";

export default function Checkout() {
    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "", surname: "", email: "", mobile: "",
        landmark: "", city: "", state: "", pincode: "", country: "India"
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { loading: orderLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        if (Object.values(newAddress).some(val => !val)) {
            toast.error("Please fill all fields");
            return;
        }
        // In our simplified version, we just use this address for the order
        setSelectedAddress(newAddress);
        setShowAddressForm(false);
        setStep(2);
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }
        dispatch(createOrder(selectedAddress, navigate));
    };

    const inp = "w-full px-4 py-2.5 bg-[#171510] border border-[rgba(212,175,55,0.1)] text-[#e8dfc8] placeholder-[#3a3528] outline-none focus:border-[rgba(212,175,55,0.4)] transition-all text-sm";

    return (
        <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-24 pb-12" style={{ fontFamily: "'Jost', sans-serif" }}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Stepper */}
                <div className="flex items-center justify-center mb-16">
                    {[
                        { id: 1, name: "Shipping" },
                        { id: 2, name: "Review" },
                        { id: 3, name: "Payment" }
                    ].map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? "border-[#d4af37] bg-[#d4af37] text-[#0d0c0a]" : "border-[#3a3528] text-[#3a3528]"
                                    }`}>
                                    {step > s.id ? <Check className="w-5 h-5" /> : <span className="text-xs font-bold">{s.id}</span>}
                                </div>
                                <span className={`text-[0.6rem] tracking-[0.2em] uppercase mt-3 ${step >= s.id ? "text-[#d4af37]" : "text-[#3a3528]"}`}>
                                    {s.name}
                                </span>
                            </div>
                            {i < 2 && <div className={`w-24 h-[2px] mx-4 -mt-8 transition-all duration-500 ${step > s.id ? "bg-[#d4af37]" : "bg-[#3a3528]"}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-end border-b border-[rgba(212,175,55,0.1)] pb-4">
                                    <h2 className="text-2xl font-light tracking-widest uppercase italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        Shipping Destination
                                    </h2>
                                    {!showAddressForm && (
                                        <button onClick={() => setShowAddressForm(true)} className="text-[0.6rem] tracking-[0.2em] uppercase text-[#d4af37] flex items-center gap-2 hover:underline">
                                            <Plus className="w-3 h-3" /> Add New Address
                                        </button>
                                    )}
                                </div>

                                {showAddressForm ? (
                                    <form onSubmit={handleAddAddress} className="grid grid-cols-2 gap-4 p-8 bg-[#12100d] border border-[rgba(212,175,55,0.15)]">
                                        <input name="name" placeholder="First Name" onChange={handleAddressChange} className={inp} />
                                        <input name="surname" placeholder="Last Name" onChange={handleAddressChange} className={inp} />
                                        <input name="email" type="email" placeholder="Email Address" onChange={handleAddressChange} className={inp} />
                                        <input name="mobile" placeholder="Mobile Number" onChange={handleAddressChange} className={inp} />
                                        <div className="col-span-2">
                                            <input name="landmark" placeholder="Building, Street, Area" onChange={handleAddressChange} className={inp} />
                                        </div>
                                        <input name="city" placeholder="City" onChange={handleAddressChange} className={inp} />
                                        <input name="state" placeholder="State" onChange={handleAddressChange} className={inp} />
                                        <input name="pincode" placeholder="Pincode" onChange={handleAddressChange} className={inp} />
                                        <input name="country" placeholder="Country" value="India" readOnly className={inp} />
                                        <div className="col-span-2 flex gap-4 mt-4">
                                            <button type="submit" className="flex-1 py-3 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold">Use This Address</button>
                                            <button type="button" onClick={() => setShowAddressForm(false)} className="flex-1 py-3 border border-[rgba(212,175,55,0.2)] text-[#e8dfc8] text-[0.65rem] tracking-[0.3em] uppercase">Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* If user had addresses, they'd go here. Since we're starting fresh, we'll prompt form. */}
                                        <div onClick={() => setShowAddressForm(true)} className="border-2 border-dashed border-[#3a3528] p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#d4af37] hover:bg-[rgba(212,175,55,0.03)] transition-all group">
                                            <Plus className="w-8 h-8 text-[#3a3528] group-hover:text-[#d4af37]" />
                                            <span className="text-[0.6rem] tracking-[0.3rem] uppercase text-[#6a6050] group-hover:text-[#d4af37]">Provide New Address</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h2 className="text-2xl font-light tracking-widest uppercase italic border-b border-[rgba(212,175,55,0.1)] pb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    Review Your Order
                                </h2>
                                <div className="p-8 bg-[#12100d] border border-[rgba(212,175,55,0.15)] flex justify-between items-start">
                                    <div>
                                        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] mb-2">Deliver To</p>
                                        <p className="text-lg font-light mb-1">{selectedAddress.name} {selectedAddress.surname}</p>
                                        <p className="text-sm text-[#8a8070]">{selectedAddress.landmark}, {selectedAddress.city}</p>
                                        <p className="text-sm text-[#8a8070]">{selectedAddress.state} - {selectedAddress.pincode}</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-[0.6rem] tracking-[0.2em] uppercase text-[#d4af37] underline">Change</button>
                                </div>

                                <div className="space-y-4">
                                    {cart?.cartItems?.map(item => (
                                        <div key={item._id} className="flex gap-4 p-4 bg-[#12100d]/50 border border-[rgba(212,175,55,0.05)]">
                                            <img src={item.product?.images?.[0] || item.product?.image} className="w-16 h-20 object-cover border border-[rgba(212,175,55,0.1)]" />
                                            <div className="flex-1">
                                                <p className="text-sm font-light uppercase tracking-wide">{item.product?.title}</p>
                                                <p className="text-[0.6rem] text-[#6a6050]">Qty: {item.quantity}</p>
                                                <p className="text-sm text-[#d4af37] font-medium mt-1">₹{item.discountedPrice.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] hover:text-[#d4af37]">
                                        <ArrowLeft className="w-3 h-3" /> Back to Shipping
                                    </button>
                                    <button onClick={() => setStep(3)} className="ml-auto px-12 py-3.5 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold hover:shadow-xl transition-all">
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-12">
                                <div className="w-20 h-20 bg-[rgba(212,175,55,0.05)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[rgba(212,175,55,0.1)]">
                                    <CreditCard className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <h2 className="text-3xl font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Cash on Delivery</h2>
                                <p className="text-sm text-[#8a8070] max-w-sm mx-auto mb-12 uppercase tracking-[0.1em] leading-relaxed">
                                    Currently we only support Cash on Delivery to ensure hand-inspected luxury delivery at your doorstep.
                                </p>
                                <div className="flex justify-center gap-6">
                                    <button onClick={() => setStep(2)} className="px-8 py-3 border border-[rgba(212,175,55,0.2)] text-[0.65rem] tracking-[0.3em] uppercase">Back to Review</button>
                                    <button onClick={handlePlaceOrder} disabled={orderLoading} className="px-12 py-3 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold flex items-center gap-2">
                                        {orderLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Order"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="p-8 bg-[#12100d] border border-[rgba(212,175,55,0.15)] sticky top-28">
                            <h3 className="text-xl font-light tracking-widest uppercase mb-8 pb-4 border-b border-[rgba(212,175,55,0.1)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Order Summary
                            </h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-[0.65rem] tracking-[0.2em] uppercase text-[#6a6050]">
                                    <span>Subtotal</span>
                                    <span>₹{cart?.totalPrice?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[0.65rem] tracking-[0.2em] uppercase text-[#6a6050]">
                                    <span>Savings</span>
                                    <span className="text-emerald-500">₹{cart?.discount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[0.65rem] tracking-[0.2em] uppercase text-[#6a6050]">
                                    <span>Shipping</span>
                                    <span className="text-emerald-500">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-baseline mb-8 pt-4 border-t border-[rgba(212,175,55,0.1)]">
                                <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold">Total</span>
                                <span className="text-2xl font-bold text-[#d4af37]">₹{cart?.totalDiscountedPrice?.toLocaleString()}</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { icon: ShieldCheck, text: "Authenticity Guaranteed" },
                                    { icon: Truck, text: "Insured Express Delivery" }
                                ].map((itm, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[0.55rem] tracking-widest uppercase text-[#4a4438]">
                                        <itm.icon className="w-3.5 h-3.5 text-[#d4af37]/40" />
                                        <span>{itm.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
