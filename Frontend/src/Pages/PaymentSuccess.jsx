
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../States/Payment/Action';
import { CheckCircle2, ArrowRight, Package, ShoppingBag, Loader2 } from 'lucide-react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, payment } = useSelector(state => state.payment);

    useEffect(() => {
        const paymentId = searchParams.get('razorpay_payment_id');
        const paymentLinkId = searchParams.get('razorpay_payment_link_id');
        const status = searchParams.get('razorpay_payment_link_status');
        const orderId = searchParams.get('orderId');

        if (paymentId && orderId) {
            dispatch(updatePayment({ paymentId, paymentLinkId, status, orderId }));
        }
    }, [dispatch, searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d0c0a] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#d4af37] animate-spin mx-auto mb-4" />
                    <p className="text-[#e8dfc8] tracking-widest uppercase text-xs">Confirming Payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-32 pb-20 px-6" style={{ fontFamily: "'Jost', sans-serif" }}>
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#12100d] border border-[rgba(212,175,55,0.15)] p-12 text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl -ml-16 -mt-16" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl -mr-16 -mt-16" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[rgba(16,185,129,0.2)]">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>

                        <h1 className="text-4xl font-light italic mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Payment Successful
                        </h1>
                        <p className="text-[#8a8070] text-sm tracking-widest uppercase mb-12 max-w-md mx-auto leading-relaxed">
                            Thank you for choosing JewellMart. Your order has been confirmed and is being processed by our artisans.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            <div className="p-6 bg-[#0d0c0a] border border-[rgba(212,175,55,0.05)] text-left">
                                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] mb-2">Order ID</p>
                                <p className="text-sm font-medium text-[#d4af37]">#{payment?.order?._id || 'Loading...'}</p>
                            </div>
                            <div className="p-6 bg-[#0d0c0a] border border-[rgba(212,175,55,0.05)] text-left">
                                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] mb-2">Amount Paid</p>
                                <p className="text-sm font-medium text-[#d4af37]">₹{payment?.order?.totalPrice || '...'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/orders')}
                                className="px-8 py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.35em] uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#c49a22] transition-all"
                            >
                                <Package className="w-4 h-4" /> Trace Order
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 border border-[rgba(212,175,55,0.2)] text-[#e8dfc8] text-[0.65rem] tracking-[0.35em] uppercase font-bold flex items-center justify-center gap-2 hover:bg-[rgba(212,175,55,0.05)] transition-all"
                            >
                                <ShoppingBag className="w-4 h-4" /> Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 text-[0.6rem] tracking-[0.2em] uppercase text-[#4a4438]">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        SSL Secure
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        24/7 Support
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
