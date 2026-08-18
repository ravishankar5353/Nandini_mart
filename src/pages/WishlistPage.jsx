import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Save your favourite groceries and fruits here to order quickly anytime.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-98"
        >
          <span>Explore Grocery Items</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
          <span>My Wishlist ({wishlist.length})</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
          Your saved grocery staples and personal favorites with guaranteed doorstep delivery.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-3">
                <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-contain" />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-rose-600 hover:bg-rose-50 shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                {product.brand}
              </span>
              <Link
                to={`/product/${product.id}`}
                className="font-bold text-slate-900 text-sm hover:text-emerald-700 line-clamp-2 block mt-0.5"
              >
                {product.name}
              </Link>
              <p className="text-xs text-slate-500 mt-0.5">{product.unit}</p>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-base font-black text-slate-900">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <button
                onClick={() => moveToCart(product)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
