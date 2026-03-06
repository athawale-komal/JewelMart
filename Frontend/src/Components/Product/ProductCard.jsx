import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Gem, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../States/Cart/Action';
import { addToWishlist, removeFromWishlist } from '../../States/Wishlist/Action';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { wishlist } = useSelector(state => state.wishlist);
    const isWishlisted = wishlist?.some(item => item.product?._id === product._id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cartData = {
            productId: product._id,
            productSku: product.productSku,
            quantity: 1
        };
        dispatch(addItemToCart(cartData));
        toast.success("Added to Cart!");
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
            toast.success("Removed from Wishlist");
        } else {
            dispatch(addToWishlist(product._id));
            toast.success("Added to Wishlist!");
        }
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 flex flex-col h-full">
            <div
                className="relative overflow-hidden bg-stone-100 h-[230px] cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
            >
                {/* Product Image */}
                <img
                    src={product.images?.[0] || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                        onClick={handleWishlist}
                        className={`p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg transition-all hover:scale-110 ${isWishlisted ? 'text-rose-600 bg-rose-50' : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-amber-50 text-gray-600 hover:text-amber-600 transition-all hover:scale-110"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.discountPercent > 0 && (
                        <div className="bg-rose-600 text-white px-3 py-1 rounded-full text-[0.65rem] font-bold shadow-lg uppercase tracking-wider">
                            {product.discountPercent}% OFF
                        </div>
                    )}
                    {product.stock < 5 && product.stock > 0 && (
                        <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-[0.65rem] font-bold shadow-lg uppercase tracking-wider">
                            LOW STOCK
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[0.65rem] font-bold shadow-lg uppercase tracking-wider">
                            OUT OF STOCK
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-[0.6rem] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">
                        {product.category?.name || product.category || "Jewellery"}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-[0.65rem] font-bold text-gray-700">{product.numRatings || 0}</span>
                    </div>
                </div>

                <h3
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="text-base font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors cursor-pointer"
                >
                    {product.title}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                        ₹{product.discountedPrice?.toLocaleString('en-IN')}
                    </span>
                    {product.price > product.discountedPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between text-[0.65rem] text-gray-500 mb-6 py-4 border-y border-gray-50 mt-auto">
                    <span className="flex items-center gap-1.5">
                        <Gem className="w-3.5 h-3.5 text-amber-600" />
                        {product.metalType || "Gold"}
                    </span>
                    <span className="font-medium tracking-wider">{product.purity || "22K"} purity</span>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-xl flex items-center justify-center gap-2 group/btn uppercase text-[0.65rem] tracking-widest ${product.stock === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed transform-none shadow-none'
                        : 'bg-gray-900 text-white hover:bg-amber-600'
                        }`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
