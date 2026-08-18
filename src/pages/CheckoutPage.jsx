import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Home,
  MapPin,
  Plus,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowRight,
  Truck,
  AlertCircle,
  QrCode,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { DoorstepDeliveryBadge } from '../components/common/DoorstepDeliveryBadge';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, itemTotal, productSavings, couponDiscount, deliveryFee, handlingFee, finalTotal, totalSavings, appliedCoupon } = useCart();
  const { user, selectedAddressId, selectDeliveryAddress, openAddressModal, activeDeliveryAddress } = useAuth();
  const { placeOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'CARD', 'COD'
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    holder: 'MNM User',
    expiry: '08/29',
    cvv: '•••'
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs inline-block">
          Explore Groceries
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setErrorMsg('');
    if (!activeDeliveryAddress) {
      setErrorMsg('Please select or add a valid doorstep delivery address.');
      return;
    }

    try {
      setLoading(true);
      const newOrder = await placeOrder({
        items,
        address: activeDeliveryAddress,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${selectedUpiApp})` : paymentMethod === 'CARD' ? 'Credit / Debit Card' : 'Cash on Delivery',
        billDetails: {
          itemTotal,
          discount: productSavings + couponDiscount,
          deliveryFee,
          handlingFee,
          total: finalTotal
        }
      });

      navigate(`/order-success/${newOrder.id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Checkout Title */}
      <div className="pb-3 border-b border-slate-200">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">
          Checkout & Doorstep Delivery
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
          Complete your order with mandatory contactless doorstep delivery.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: DELIVERY ADDRESS */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center">
                  1
                </span>
                <div>
                  <h2 className="font-black text-slate-900 text-base md:text-lg">
                    Delivery Address
                  </h2>
                  <p className="text-xs text-slate-500">Where should we deliver your groceries?</p>
                </div>
              </div>

              <button
                onClick={() => openAddressModal(null)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {user?.addresses && user.addresses.length > 0 ? (
                user.addresses.map(addr => {
                  const isSelected = addr.id === selectedAddressId || (selectedAddressId === null && addr.isDefault);
                  return (
                    <div
                      key={addr.id}
                      onClick={() => selectDeliveryAddress(addr.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs text-slate-900">{addr.fullName}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600">
                            {addr.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug">
                          {addr.houseNo}, {addr.street}, {addr.area}
                        </p>
                        <p className="text-xs text-slate-600 font-bold mt-0.5">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Phone: {addr.phone}</p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Delivering here</span>
                            </>
                          ) : (
                            <span className="text-slate-400">Click to select</span>
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddressModal(addr);
                          }}
                          className="text-[11px] font-bold text-slate-500 hover:text-emerald-700"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 mb-2">No delivery address saved yet.</p>
                  <button
                    onClick={() => openAddressModal(null)}
                    className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                  >
                    + Add Doorstep Delivery Address
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* STEP 2: DELIVERY METHOD — MANDATORY (Locked) */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center">
                2
              </span>
              <div>
                <h2 className="font-black text-slate-900 text-base md:text-lg">
                  Delivery Method
                </h2>
                <p className="text-xs text-slate-500">Auto-configured for your convenience</p>
              </div>
            </div>

            {/* Mandatory Doorstep Card */}
            <DoorstepDeliveryBadge variant="checkout" />
          </section>

          {/* STEP 3: DEMO PAYMENT METHOD */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center">
                3
              </span>
              <div>
                <h2 className="font-black text-slate-900 text-base md:text-lg">
                  Payment Method
                </h2>
                <p className="text-xs text-slate-500">Demo payment simulation &middot; No real money charged</p>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-700" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-teal-700" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-700" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Sub-panels for selected payment */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                <span className="text-xs font-bold text-slate-700 block">Select Demo UPI Provider:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Google Pay', 'PhonePe', 'Paytm', 'Scan QR'].map(app => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedUpiApp(app)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        selectedUpiApp === app
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {app === 'Scan QR' && <QrCode className="w-3.5 h-3.5" />}
                      <span>{app}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500">
                  Demo Fast Checkout with <strong>{selectedUpiApp}</strong> enabled.
                </p>
              </div>
            )}

            {paymentMethod === 'CARD' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      readOnly
                      value={cardDetails.number}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      readOnly
                      value={cardDetails.holder}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      readOnly
                      value={cardDetails.expiry}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">CVV</label>
                    <input
                      type="text"
                      readOnly
                      value={cardDetails.cvv}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  Demo 128-bit SSL encrypted card credentials pre-loaded.
                </p>
              </div>
            )}

            {paymentMethod === 'COD' && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1 animate-in fade-in">
                <p className="font-bold">Pay at your doorstep upon grocery delivery.</p>
                <p className="text-[11px] text-amber-800">
                  You can pay cash or scan the delivery executive's UPI QR code directly at your door.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Order Review & Place Order Button */}
        <div className="lg:col-span-4 space-y-4 sticky top-36">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card space-y-4">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
              Order Review ({items.length} Items)
            </h3>

            {/* Items scroll */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-black text-slate-800 shrink-0">{quantity}x</span>
                    <span className="text-slate-700 truncate">{product.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            {/* Address recap */}
            {activeDeliveryAddress && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-0.5">
                <span className="font-bold text-slate-500 uppercase tracking-wider block">
                  Delivering to:
                </span>
                <p className="font-bold text-slate-900">{activeDeliveryAddress.fullName}</p>
                <p className="text-slate-600 truncate">
                  {activeDeliveryAddress.houseNo}, {activeDeliveryAddress.area}
                </p>
              </div>
            )}

            {/* Summary details */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Item Total</span>
                <span>₹{itemTotal}</span>
              </div>

              {productSavings + couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Total Discount</span>
                  <span>- ₹{productSavings + couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Doorstep Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Handling & Packaging</span>
                <span>₹{handlingFee}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-black text-sm text-slate-900">Total Amount</span>
                <span className="font-black text-2xl text-slate-900">₹{finalTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <span>PLACE ORDER</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400 font-semibold">
              🔒 Safe & Contactless Doorstep Delivery Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
