
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedHistory, deleteHistoryItem } from '../States/Order/Action';
import { History, Trash2, ArrowLeft, Loader2, AlertCircle, ShoppingBag, Eye, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { deletedHistory, loading } = useSelector(state => state.order);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }
        dispatch(getDeletedHistory());
    }, [dispatch, user, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Permanently delete this item from history? This action cannot be undone.")) {
            try {
                await dispatch(deleteHistoryItem(id));
                toast.success("Item permanently removed");
            } catch (err) {
                toast.error("Failed to remove item");
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0d0c0a] text-[#e8dfc8] pt-32 pb-20 px-6 lg:px-14" style={{ fontFamily: "'Jost', sans-serif" }}>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <button
                            onClick={() => navigate('/orders')}
                            className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] hover:text-[#d4af37] transition-colors mb-6"
                        >
                            <ArrowLeft className="w-3 h-3" /> Back to My Orders
                        </button>
                        <h1 className="text-5xl font-light italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Archived Repository
                        </h1>
                        <p className="text-[#8a8070] text-[0.6rem] tracking-[0.2em] uppercase">Historical records of deleted acquisitions</p>
                    </div>

                    <div className="p-4 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.1)] rounded-sm">
                        <History className="w-8 h-8 text-[#d4af37]" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="w-12 h-12 text-[#d4af37] animate-spin" />
                        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050]">Retrieving Archives...</p>
                    </div>
                ) : !deletedHistory || deletedHistory.length === 0 ? (
                    <div className="text-center py-40 bg-[#12100d]/50 border border-dashed border-[rgba(212,175,55,0.1)] rounded-sm">
                        <p className="text-sm italic text-[#6a6050] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>No historical items found in this segment.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-10 py-4 bg-[#d4af37] text-[#0d0c0a] text-[0.65rem] tracking-[0.3em] uppercase font-bold"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {deletedHistory.map((item) => (
                            <div key={item._id} className="bg-[#12100d] border border-[rgba(212,175,55,0.1)] p-6 group hover:border-[rgba(212,175,55,0.3)] transition-all duration-500 rounded-sm">
                                <div className="flex gap-6">
                                    <div className="relative aspect-[4/5] w-24 overflow-hidden border border-[rgba(212,175,55,0.05)]">
                                        <img
                                            src={item.image || item.product?.image}
                                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xs tracking-[0.15em] uppercase font-light text-[#8a8070] truncate max-w-[150px]">{item.title}</h3>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-2 hover:bg-red-500/10 rounded-full transition-all group/del"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-red-500/30 group-hover/del:text-red-500" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-sm font-medium text-[#d4af37]">₹{item.discountedPrice.toLocaleString()}</span>
                                            <span className="text-[0.6rem] text-[#4a4438] line-through">₹{item.price.toLocaleString()}</span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[0.55rem] tracking-[0.1em] text-[#6a6050] uppercase">
                                                <Calendar className="w-3 h-3 text-[#d4af37]/40" />
                                                Archived on {formatDate(item.updatedAt)}
                                            </div>
                                            <div className="flex items-center gap-2 text-[0.55rem] tracking-[0.1em] text-[#6a6050] uppercase">
                                                <ShoppingBag className="w-3 h-3 text-[#d4af37]/40" />
                                                Qty: {item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[rgba(212,175,55,0.05)] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-[0.5rem] tracking-[0.3em] uppercase text-[#3a3528]">Ref: {item._id.slice(-8)}</span>
                                    <button
                                        onClick={() => navigate(`/product/${item.product?._id || item.product}`)}
                                        className="text-[0.6rem] tracking-[0.2em] uppercase text-[#d4af37] flex items-center gap-2 hover:underline"
                                    >
                                        <Eye className="w-3 h-3" /> View Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-20 p-8 border border-[rgba(212,175,55,0.05)] bg-[#12100d]/30 text-center rounded-sm">
                    <AlertCircle className="w-6 h-6 text-[#3a3528] mx-auto mb-4" />
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#4a4438] max-w-sm mx-auto leading-relaxed">
                        The archived repository preserves historical item records even after parent orders are cleared. Records can be permanently expunged using the artisan's tools.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
