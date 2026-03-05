
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishlist } from "../States/Wishlist/Action";
import { addItemToCart } from "../States/Cart/Action";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowRight, Loader2, Eye } from "lucide-react";
import { toast } from "react-toastify";
import ProductCard from "../Components/Product/ProductCard";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);



  if (loading && !wishlist) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  // wishlist is an array of objects: [{ product: { ... } }]
  const items = wishlist || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-widest">Wishlist</h1>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-5">
              <Heart size={36} className="text-rose-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-600 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-400 text-sm mb-8">Save items you love for later.</p>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-md shadow-amber-200 active:scale-95"
            >
              Explore Collection <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              item.product && (
                <div key={item.product._id} className="animate-fadeIn">
                  <ProductCard product={item.product} />
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}