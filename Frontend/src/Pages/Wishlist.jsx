
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishlist } from "../States/Wishlist/Action";
import { addItemToCart } from "../States/Cart/Action";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowRight, Loader2, Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
    toast.success("Added to cart!");
  };

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
            {items.map((item) => {
              const product = item.product;
              if (!product) return null;

              return (
                <div
                  key={product._id}
                  className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      onClick={() => navigate(`/product/${product._id}`)}
                      style={{ cursor: "pointer" }}
                    />

                    {/* Discount badge */}
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    )}

                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="w-11 h-11 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-white transition-all"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg hover:bg-amber-600 transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={18} />
                      </button>
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="w-11 h-11 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all"
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">{product.category}</span>
                    <h3
                      className="text-sm font-bold text-slate-800 mt-1 mb-1 line-clamp-1 uppercase tracking-wide cursor-pointer hover:text-amber-600 transition-colors"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-base font-bold text-amber-600">
                        ₹{(product.discountedPrice || product.price)?.toLocaleString()}
                      </span>
                      {product.discountedPrice && product.discountedPrice < product.price && (
                        <span className="text-xs text-slate-400 line-through">₹{product.price?.toLocaleString()}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                      >
                        <ShoppingCart size={13} /> Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="p-2.5 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}