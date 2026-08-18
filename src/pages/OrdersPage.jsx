import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  Clock,
  Home,
  CheckCircle2,
  Calendar,
  ChevronRight,
  RotateCcw,
  FileText,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const OrdersPage = () => {
  const { orders, loading } = useOrders();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const handleReorder = (order) => {
    order.items?.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: Math.round(item.price * 1.2),
        image: item.image,
        unit: item.unit || '1 unit',
        categoryName: 'Grocery'
      }, item.quantity);
    });
    addToast(`Reordered ${order.items?.length} items into cart! 🛒`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
          <Package className="w-7 h-7 text-emerald-700" />
          <span>My Orders</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
          View all your previous and active MNM MART doorstep deliveries.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-44 rounded-3xl bg-slate-100 animate-shimmer" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs space-y-4">
          <Package className="w-16 h-16 text-slate-300 mx-auto" />
          <h3 className="text-lg font-black text-slate-900">No Orders Found</h3>
          <p className="text-xs text-slate-500">You have not placed any grocery orders yet.</p>
          <Link to="/shop" className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const formattedDate = new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/80 shadow-xs hover:shadow-card transition-all space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-black text-sm text-slate-900">
                      Order #{order.id}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">&middot;</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 ${
                        order.statusCode === 4
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.statusCode === 3
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse-subtle'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {order.statusCode === 4 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                      {order.statusCode === 3 && <Truck className="w-3.5 h-3.5 text-amber-700" />}
                      <span>{order.status}</span>
                    </span>

                    <span className="font-black text-base text-slate-900 ml-2">
                      ₹{order.total}
                    </span>
                  </div>
                </div>

                {/* Items & Address Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Item Thumbnails */}
                  <div className="md:col-span-8 flex items-center gap-2.5 overflow-x-auto pb-1">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 shrink-0 flex items-center justify-center relative group"
                        title={`${item.name} (${item.quantity}x)`}
                      >
                        <ImageWithFallback src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                        <span className="absolute bottom-0 right-0 px-1.5 py-0.2 rounded-tl-md bg-slate-900 text-white text-[9px] font-black">
                          {item.quantity}x
                        </span>
                      </div>
                    ))}
                    <div className="text-xs text-slate-500 font-semibold pl-2">
                      {order.items?.length} items
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                      <Home className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Doorstep Delivery to:</span>
                    </div>
                    <p className="truncate font-medium">{order.address?.fullName} - {order.address?.houseNo}</p>
                    <p className="text-[11px] text-slate-500 truncate">{order.address?.area}, {order.address?.city} {order.address?.pincode}</p>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Mandatory Doorstep Delivery Verified</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>

                    <Link
                      to={`/track-order/${order.id}`}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Tax Invoice / Receipt
                </span>
                <h3 className="font-black text-lg text-slate-900">Order #{selectedInvoiceOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-1 text-slate-400 hover:text-slate-900 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 space-y-1">
                <p className="font-bold text-slate-900">MNM MART Doorstep Groceries</p>
                <p className="text-slate-500">GSTIN: 29AAAAA0000A1Z5 &middot; CIN: U52100KA2026PTC</p>
                <p className="text-slate-500">Doorstep Delivery Partner: {selectedInvoiceOrder.deliveryPartner?.name || 'Ramesh Kumar'}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Itemized Breakdown:</h4>
                <div className="space-y-1.5 border-t border-slate-100 pt-2">
                  {selectedInvoiceOrder.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.quantity}x {it.name}</span>
                      <span className="font-bold">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{selectedInvoiceOrder.itemTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>- ₹{selectedInvoiceOrder.discount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Doorstep Delivery</span>
                  <span>{selectedInvoiceOrder.deliveryFee === 0 ? 'FREE' : `₹${selectedInvoiceOrder.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Handling & Packaging</span>
                  <span>₹{selectedInvoiceOrder.handlingFee}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Paid ({selectedInvoiceOrder.paymentMethod})</span>
                  <span>₹{selectedInvoiceOrder.total}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
