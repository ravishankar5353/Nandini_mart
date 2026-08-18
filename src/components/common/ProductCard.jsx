import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus, Star, ShoppingCart, Zap, Check, Home } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const currentQty = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentQty === 0) {
      addToCart(product, 1);
    }
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, currentQty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, currentQty - 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/40 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Badges & Wishlist */}
      <div className="relative p-3 pb-0">
        <div className="flex items-center justify-between gap-1 z-10">
          <div className="flex flex-col gap-1">
            {product.discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-rose-500 text-white shadow-sm tracking-wide">
                {product.discountPercent}% OFF
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm uppercase tracking-wider">
                Bestseller
              </span>
            )}
          </div>

          <button
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm scale-105'
                : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 hover:bg-rose-50/80 border border-slate-200/60'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl mt-1 aspect-square bg-slate-50">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            category={product.categoryName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg border border-slate-700">
                Out of Stock
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-3.5 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] font-bold text-emerald-800 border border-emerald-200/60">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{product.rating}</span>
              <span className="text-emerald-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="font-bold text-slate-900 hover:text-emerald-700 text-sm leading-snug line-clamp-2 transition-colors"
          >
            {product.name}
          </Link>

          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {product.unit}
          </p>

          {/* Doorstep Delivery Guarantee Micro Tag */}
          <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-slate-600">
            <Home className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">Doorstep Delivery in 30-45m</span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-base font-extrabold text-slate-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            {currentQty === 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="col-span-1 flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-300 hover:border-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                <span>Add</span>
              </button>
            ) : (
              <div className="col-span-1 flex items-center justify-between bg-emerald-700 text-white rounded-xl px-1.5 py-1.5 shadow-sm">
                <button
                  onClick={handleDecrement}
                  className="w-6 h-6 rounded-lg bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center active:scale-90 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-extrabold">{currentQty}</span>
                <button
                  onClick={handleIncrement}
                  className="w-6 h-6 rounded-lg bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center active:scale-90 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}

            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="col-span-1 flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-95 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
