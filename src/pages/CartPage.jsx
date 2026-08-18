import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Home,
  ShieldCheck,
  Tag,
  Percent,
  Check,
  X,
  Sparkles,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { DoorstepDeliveryBadge } from '../components/common/DoorstepDeliveryBadge';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemTotal,
    mrpTotal,
    productSavings,
    couponDiscount,
    deliveryFee,
    handlingFee,
    finalTotal,
    totalSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeDelivery,
    freeDeliveryThreshold
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  const handleMoveToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      toggleWishlist(product);
    }
    removeFromCart(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Looks like you haven't added any fresh groceries or essentials yet.
            </p>
          </div>

          <Link
            to="/shop"
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const freeDeliveryProgress = Math.min(100, Math.round((itemTotal / freeDeliveryThreshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>Shopping Cart</span>
            <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your grocery items before entering your mandatory doorstep delivery address.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 self-start sm:self-auto"
        >
          Clear Cart
        </button>
      </div>

      {/* Free Doorstep Delivery Progress Bar */}
      <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
          <span className="flex items-center gap-1.5">
            <Home className="w-4 h-4 text-emerald-700" />
            {amountNeededForFreeDelivery === 0 ? (
              <span className="text-emerald-800">🎉 Congratulations! You unlocked <strong>FREE Doorstep Delivery</strong></span>
            ) : (
              <span>Add ₹{amountNeededForFreeDelivery} more for <strong>FREE Doorstep Delivery</strong></span>
            )}
          </span>
          <span>{freeDeliveryProgress}%</span>
        </div>
        <div className="w-full h-2.5 bg-emerald-200/70 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items (Left) + Bill Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <Link
                  to={`/product/${product.id}`}
                  className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    category={product.categoryName}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                    {product.brand}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors block truncate"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-slate-500 font-medium">{product.unit}</p>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-slate-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Item Total */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                {/* Quantity */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center active:scale-95 transition-all shadow-xs"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center active:scale-95 transition-all shadow-xs"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sub-total */}
                <div className="text-right min-w-[70px]">
                  <div className="text-sm font-black text-slate-900">
                    ₹{product.price * quantity}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-[10px] text-emerald-700 font-bold">
                      Saved ₹{(product.originalPrice - product.price) * quantity}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveToWishlist(product)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Mandatory Doorstep Delivery Alert Card */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300/80 flex items-start gap-3">
            <Home className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-emerald-950 font-black">100% Doorstep Delivery Guarantee:</strong> All items in your cart will be carefully packed in eco-friendly tamper-proof bags and delivered right to your apartment door with instant OTP confirmation.
            </div>
          </div>
        </div>

        {/* Right: Bill Details & Proceed to Checkout */}
        <div className="lg:col-span-4 space-y-4 sticky top-36">
          {/* Coupon Code Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-900 uppercase tracking-wider">
              <Tag className="w-4 h-4 text-emerald-700" />
              <span>Apply Discount Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-black text-xs text-emerald-900">{appliedCoupon.code}</span>
                  <p className="text-[11px] text-emerald-700">{appliedCoupon.desc}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. NANDINI50, FREEDELIVERY"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-bold outline-none focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Quick demo coupon chips */}
            {!appliedCoupon && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => applyCoupon('NANDINI50')}
                  className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200"
                >
                  NANDINI50 (₹50 off)
                </button>
                <button
                  type="button"
                  onClick={() => applyCoupon('FREEDELIVERY')}
                  className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200"
                >
                  FREEDELIVERY
                </button>
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
              Bill Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Item Total (MRP)</span>
                <span>₹{mrpTotal}</span>
              </div>

              {productSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Product Discount</span>
                  <span>- ₹{productSavings}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <span>Doorstep Delivery Fee</span>
                  {deliveryFee === 0 && (
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      FREE
                    </span>
                  )}
                </span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-slate-600 font-medium">
                <span>Handling & Eco Packaging</span>
                <span>₹{handlingFee}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-black text-sm text-slate-900">To Pay</span>
                <span className="font-black text-2xl text-slate-900">₹{finalTotal}</span>
              </div>

              {totalSavings > 0 && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-center text-xs font-bold border border-emerald-200">
                  🎉 Total Savings on this order: ₹{totalSavings}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
