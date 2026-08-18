import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Home,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  MapPin
} from 'lucide-react';
import { productApi } from '../services/productApi';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { activeDeliveryAddress } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProductById(id);
        setProduct(data);
        if (data?.category) {
          const related = await productApi.getRelatedProducts(data.category, data.id);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-10 bg-slate-200 rounded w-3/4" />
            <div className="h-8 bg-slate-200 rounded w-1/4" />
            <div className="h-32 bg-slate-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Product Not Found</h2>
        <p className="text-sm text-slate-500">The grocery item you requested could not be located.</p>
        <Link to="/shop" className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs inline-block">
          Browse All Groceries
        </Link>
      </div>
    );
  }

  const inCartQty = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
  };

  const handleBuyNow = () => {
    if (inCartQty === 0) {
      addToCart(product, selectedQty);
    }
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-emerald-700">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold truncate">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-card p-6 flex items-center justify-center aspect-square">
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-extrabold bg-rose-500 text-white shadow-sm">
                {product.discountPercent}% OFF
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm'
                  : 'bg-slate-100 text-slate-400 hover:text-rose-500'
              }`}
              aria-label="Wishlist button"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <ImageWithFallback
              src={product.image}
              alt={product.name}
              category={product.categoryName}
              className="max-h-full max-w-full object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Quick Quality Guarantee Pill */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              100% Quality Assurance
            </span>
            <span className="text-emerald-700">Farm Fresh</span>
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400 font-semibold">&middot;</span>
              <span className="text-xs text-slate-500 font-semibold">{product.categoryName}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm font-bold text-slate-500 mt-1">
              Unit: <span className="text-slate-800">{product.unit}</span>
            </p>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold shadow-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {product.reviewCount} customer reviews
              </span>
              <span className="text-slate-300">&middot;</span>
              <span className="text-xs font-bold text-emerald-700">
                Verified Grocery Quality
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-slate-400 line-through font-semibold">
                  MRP ₹{product.originalPrice}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Save ₹{product.originalPrice - product.price} ({product.discountPercent}%)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Inclusive of all taxes &middot; Guaranteed doorstep delivery
            </p>
          </div>

          {/* Core Doorstep Delivery Box (Mandatory Requirement) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-emerald-950 text-sm md:text-base">
                <Home className="w-5 h-5 text-emerald-700" />
                <span>🚚 Doorstep Delivery</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                Mandatory
              </span>
            </div>

            <p className="text-xs font-medium text-emerald-900 leading-relaxed">
              <strong>Available for delivery to your selected address:</strong>{' '}
              {activeDeliveryAddress
                ? `${activeDeliveryAddress.houseNo}, ${activeDeliveryAddress.area}, ${activeDeliveryAddress.city} - ${activeDeliveryAddress.pincode}`
                : 'Bengaluru Pin 560038'}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-emerald-800 pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Delivered in 30-45 Mins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Contactless Handover</span>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold transition-colors shadow-xs"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-black text-slate-900">
                  {selectedQty}
                </span>
                <button
                  onClick={() => setSelectedQty(selectedQty + 1)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs font-semibold text-emerald-700">
                {product.inStock ? '✓ In Stock & Ready to Ship' : 'Out of Stock'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Buy Now with Doorstep Delivery</span>
              </button>
            </div>
          </div>

          {/* Description & Key Features */}
          <div className="border-t border-slate-200/80 pt-6 space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                Product Description
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.features && (
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                  Key Features & Highlights
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.storage && (
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 font-medium">
                <strong>Storage Instructions:</strong> {product.storage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Frequently Bought Together in {product.categoryName}
            </h3>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Explore More</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
