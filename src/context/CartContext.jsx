import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();
const CART_STORAGE_KEY = 'mnm_mart_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const updatedQty = existing.quantity + quantity;
        addToast(`Updated ${product.name} quantity to ${updatedQty}`, 'success');
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: updatedQty }
            : item
        );
      } else {
        addToast(`Added ${product.name} to cart! 🛒`, 'success');
        return [...prev, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setItems(prev => {
      const target = prev.find(item => item.product.id === productId);
      if (target) {
        addToast(`Removed ${target.product.name} from cart`, 'info');
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MNM50') {
      if (itemTotal < 299) {
        addToast('Coupon MNM50 requires a minimum order of ₹299', 'warning');
        return false;
      }
      setAppliedCoupon({ code: 'MNM50', discountType: 'fixed', value: 50, desc: '₹50 Instant Discount' });
      addToast('Coupon MNM50 applied! Saved ₹50 🎉', 'success');
      return true;
    } else if (cleanCode === 'FREEDELIVERY') {
      setAppliedCoupon({ code: 'FREEDELIVERY', discountType: 'delivery', value: 30, desc: 'Free Doorstep Delivery' });
      addToast('Coupon FREEDELIVERY applied! 🚚', 'success');
      return true;
    } else if (cleanCode === 'MNM100') {
      if (itemTotal < 599) {
        addToast('Coupon MNM100 requires a minimum order of ₹599', 'warning');
        return false;
      }
      setAppliedCoupon({ code: 'MNM100', discountType: 'fixed', value: 100, desc: '₹100 Mega Grocery Discount' });
      addToast('Coupon MNM100 applied! Saved ₹100 🎉', 'success');
      return true;
    } else {
      addToast('Invalid coupon code. Try "MNM50" or "FREEDELIVERY"', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Computations
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const itemTotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const mrpTotal = items.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const productSavings = Math.max(0, mrpTotal - itemTotal);

  const freeDeliveryThreshold = 499;
  const standardDeliveryFee = 30;
  let deliveryFee = itemTotal >= freeDeliveryThreshold || itemTotal === 0 ? 0 : standardDeliveryFee;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = Math.min(itemTotal, appliedCoupon.value);
    } else if (appliedCoupon.discountType === 'delivery') {
      deliveryFee = 0;
      couponDiscount = 0;
    }
  }

  const handlingFee = items.length > 0 ? 4 : 0;
  const totalSavings = productSavings + couponDiscount + (itemTotal >= freeDeliveryThreshold ? 30 : 0);
  const finalTotal = Math.max(0, itemTotal - couponDiscount + deliveryFee + handlingFee);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - itemTotal);

  const getItemQuantity = (productId) => {
    const item = items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItemCount,
        itemTotal,
        mrpTotal,
        productSavings,
        couponDiscount,
        deliveryFee,
        handlingFee,
        finalTotal,
        totalSavings,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        appliedCoupon,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
