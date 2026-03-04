import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../States/Products/Action";
import { addItemToCart } from "../States/Cart/Action";
import { addToWishlist } from "../States/Wishlist/Action";
import api from "../config/apiConfig";
import { toast } from "react-toastify";
import {
  ShoppingCart, Heart, Zap, ArrowLeft, Star, Loader2,
  Gem, Shield, RefreshCw, Package, Edit2, Trash2, X, Check, ChevronLeft, ChevronRight
} from "lucide-react";

// ─── Star Rating Picker ────────────────────────────────────────────────────────
function StarPicker({ value, onChange, size = 24 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={size}
            className={`transition-colors ${(hovered || value) >= star ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Stars Display ─────────────────────────────────────────────────────────────
function StarsDisplay({ value = 0, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((s) => s.product);
  console.log(product);
  const { user } = useSelector((s) => s.auth);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reviews & Ratings state
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [myRating, setMyRating] = useState(0);
  const [myRatingId, setMyRatingId] = useState(null);
  const [editingReview, setEditingReview] = useState(null); // { _id, description }
  const [submittingReview, setSubmittingReview] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews"); // reviews | specs

  // Fetch product
  useEffect(() => { dispatch(findProductById(id)); }, [dispatch, id]);

  // Fetch reviews & ratings
  const fetchReviewsRatings = useCallback(async () => {
    try {
      const [revRes, ratRes] = await Promise.all([
        api.get(`/api/jewelmart/reviews/all/${id}`),
        api.get(`/api/jewelmart/rating/${id}`)
      ]);

      // Reviews: { success: true, reviews: [...] }
      const reviewsArr = Array.isArray(revRes.data?.reviews)
        ? revRes.data.reviews
        : Array.isArray(revRes.data) ? revRes.data : [];

      // Ratings: { success: true, data: [...] }
      const ratingsArr = Array.isArray(ratRes.data?.data)
        ? ratRes.data.data
        : Array.isArray(ratRes.data) ? ratRes.data : [];

      setReviews(reviewsArr);
      setRatings(ratingsArr);

      // Check if user has already rated
      if (user) {
        const mine = ratingsArr.find(r => r.user?._id === user._id || r.user === user._id);
        if (mine) { setMyRating(mine.rating); setMyRatingId(mine._id); }
      }
    } catch (e) {
      console.error(e);
    }
  }, [id, user]);

  useEffect(() => { fetchReviewsRatings(); }, [fetchReviewsRatings]);

  // Computed average rating
  const avgRating = ratings.length
    ? (ratings.reduce((a, r) => a + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId: id, quantity }));
    toast.success("Added to cart!");
  };
  const handleBuyNow = () => { handleAddToCart(); navigate("/cart"); };
  const handleWishlist = () => {
    dispatch(addToWishlist(id));
    toast.success("Added to wishlist!");
  };

  const handleSubmitRating = async () => {
    if (!myRating) return toast.error("Please select a star rating.");
    try {
      if (myRatingId) {
        await api.put(`/api/jewelmart/rating/${myRatingId}`, { rating: myRating });
        toast.success("Rating updated!");
      } else {
        await api.post(`/api/jewelmart/rating/create`, { productId: id, rating: myRating });
        toast.success("Rating submitted!");
      }
      fetchReviewsRatings();
    } catch (e) {
      toast.error(e.response?.data?.message || "Error submitting rating");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setSubmittingReview(true);
    try {
      if (editingReview) {
        await api.put(`/api/jewelmart/review/update/${editingReview._id}`, { description: reviewText });
        toast.success("Review updated!");
        setEditingReview(null);
      } else {
        await api.post(`/api/jewelmart/review/create`, { productId: id, description: reviewText });
        toast.success("Review posted!");
      }
      setReviewText("");
      fetchReviewsRatings();
    } catch (e) {
      toast.error(e.response?.data?.message || "Error submitting review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/api/jewelmart/review/delete/${reviewId}`);
      toast.success("Review deleted");
      fetchReviewsRatings();
    } catch (e) {
      toast.error(e.response?.data?.message || "Error deleting review");
    }
  };

  const startEditReview = (review) => {
    setEditingReview(review);
    setReviewText(review.description);
    setActiveTab("reviews");
    document.getElementById("review-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Gallery navigation ──────────────────────────────────────────────────
  const images = product?.images || [];
  const prevImage = () => setSelectedImage(i => (i - 1 + images.length) % images.length);
  const nextImage = () => setSelectedImage(i => (i + 1) % images.length);

  if (loading || !product) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
    </div>
  );

  const discountPct = product.price && product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-12 flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate("/")} className="hover:text-amber-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-amber-600 transition-colors">Products</button>
          <span>/</span>
          <span className="text-amber-600 font-semibold truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* ── Product Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-16">

          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden aspect-square group">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <Gem size={64} className="text-slate-300" />
                </div>
              )}

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.purity && <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{product.purity}</span>}
                {discountPct > 0 && <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{discountPct}% OFF</span>}
              </div>

              {/* Avg rating bubble */}
              {avgRating > 0 && (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-slate-700">{avgRating}</span>
                  <span className="text-xs text-slate-400">({ratings.length})</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden border-2 transition-all aspect-square ${selectedImage === i ? "border-amber-500 scale-105 shadow-md" : "border-slate-200 hover:border-amber-300"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">{product.title}</h1>
              <p className="text-slate-500 text-sm">{product.brand}</p>
            </div>

            {/* Avg Stars */}
            {ratings.length > 0 && (
              <div className="flex items-center gap-2">
                <StarsDisplay value={avgRating} size={18} />
                <span className="text-sm font-bold text-slate-700">{avgRating}</span>
                <span className="text-sm text-slate-400">({ratings.length} ratings · {reviews.length} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900">₹{(product.discountedPrice || product.price).toLocaleString()}</span>
                {product.discountedPrice && product.price !== product.discountedPrice && (
                  <span className="text-xl text-slate-400 line-through">₹{product.price.toLocaleString()}</span>
                )}
              </div>
              {discountPct > 0 && (
                <p className="text-emerald-600 font-semibold text-sm mt-1">
                  You save ₹{(product.price - product.discountedPrice).toLocaleString()} ({discountPct}% off)
                </p>
              )}
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Metal", value: product.metalType },
                { label: "Purity", value: product.purity },
                { label: "Category", value: product.category },
                { label: "Stock", value: product.stock > 0 ? `${product.stock} available` : "Out of Stock" },
              ].filter(s => s.value).map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Description</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Qty</span>
              <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-colors font-bold text-lg"
                >−</button>
                <span className="w-12 text-center font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-colors font-bold text-lg"
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-200 transition-all active:scale-[0.98]">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleBuyNow} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98]">
                  <Zap size={18} /> Buy Now
                </button>
                <button onClick={handleWishlist} className="flex items-center justify-center gap-2 border-2 border-rose-200 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98]">
                  <Heart size={18} /> Wishlist
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              {[
                { icon: Shield, label: "Certified" },
                { icon: Package, label: "Free Ship" },
                { icon: RefreshCw, label: "Easy Return" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <Icon size={18} className="text-amber-600" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Reviews / Specs ── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-slate-100">
            {["reviews", "specs"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? "text-amber-600 border-b-2 border-amber-500" : "text-slate-400 hover:text-slate-600"}`}
              >
                {tab === "reviews" ? `Reviews & Ratings (${reviews.length})` : "Full Specifications"}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* ── Reviews tab ── */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Rating summary */}
                {ratings.length > 0 && (
                  <div className="flex items-center gap-6 p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-amber-500">{avgRating}</div>
                      <StarsDisplay value={avgRating} size={18} />
                      <p className="text-xs text-slate-500 mt-1">{ratings.length} ratings</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = ratings.filter(r => Math.round(r.rating) === star).length;
                        const pct = ratings.length ? (count / ratings.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 w-4">{star}</span>
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                              <div className="bg-amber-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-slate-400 w-5">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Rate this product */}
                {user && (
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">
                      {myRatingId ? "Update Your Rating" : "Rate This Product"}
                    </h4>
                    <div className="flex items-center gap-4">
                      <StarPicker value={myRating} onChange={setMyRating} size={28} />
                      <button
                        onClick={handleSubmitRating}
                        disabled={!myRating}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-all"
                      >
                        {myRatingId ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Write a review */}
                {user && (
                  <div id="review-form" className="p-5 border border-slate-200 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">
                      {editingReview ? "Edit Your Review" : "Write a Review"}
                    </h4>
                    <form onSubmit={handleSubmitReview} className="space-y-3">
                      <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        placeholder="Share your experience with this jewelry..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none h-24"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={submittingReview || !reviewText.trim()}
                          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-all"
                        >
                          {submittingReview ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                          {editingReview ? "Save Edit" : "Post Review"}
                        </button>
                        {editingReview && (
                          <button
                            type="button"
                            onClick={() => { setEditingReview(null); setReviewText(""); }}
                            className="px-4 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-1"
                          >
                            <X size={14} /> Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}

                {/* Review list */}
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <Star size={40} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-slate-400 text-sm">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((rev) => {
                      const isOwner = user && (rev.user?._id === user._id || rev.user === user._id);
                      const userRating = ratings.find(r => r.user?._id === rev.user?._id || r.user === rev.user?._id);
                      return (
                        <div key={rev._id} className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-amber-100 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold shrink-0 text-sm">
                            {rev.user?.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-bold text-slate-800">{rev.user?.name || "Customer"}</p>
                                {userRating && <StarsDisplay value={userRating.rating} size={13} />}
                                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide">
                                  {new Date(rev.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                </p>
                              </div>
                              {isOwner && (
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => startEditReview(rev)} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-amber-500 hover:border-amber-200 transition-all">
                                    <Edit2 size={13} />
                                  </button>
                                  <button onClick={() => handleDeleteReview(rev._id)} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all">
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mt-2">{rev.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── Specs tab ── */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Product Title", value: product.title },
                  { label: "Brand", value: product.brand },
                  { label: "Category", value: product.category },
                  { label: "Metal Type", value: product.metalType },
                  { label: "Purity", value: product.purity },
                  { label: "Market Price", value: product.price ? `₹${product.price.toLocaleString()}` : null },
                  { label: "Sale Price", value: product.discountedPrice ? `₹${product.discountedPrice.toLocaleString()}` : null },
                  { label: "Discount", value: discountPct > 0 ? `${discountPct}%` : null },
                  { label: "Stock", value: product.stock !== undefined ? `${product.stock} units` : null },
                  { label: "Total Ratings", value: product.numRatings || ratings.length || null },
                  { label: "Total Reviews", value: product.numReviews || reviews.length || null },
                  { label: "SKU", value: product.productSku },
                  { label: "Tag", value: product.tag },
                ].filter(s => s.value).map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;