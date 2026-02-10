
import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

// interface ProductCardProps {
//   product: Product;
//   onAddToCart: (product: Product) => void;
// }

const ProductCard= ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-stone-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors">
            <Heart size={18} />
          </button>
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold uppercase text-rose-500 tracking-widest">{product.category}</span>
          <div className="flex items-center gap-0.5 text-amber-400">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-semibold text-slate-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-rose-600 transition-colors">{product.name}</h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-rose-600 transition-all active:scale-95"
          >
            <ShoppingCart size={16} />
            <span className="text-sm font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
