import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

const ADMIN_CREDENTIALS = {
  email: 'admin@cse.in',
  password: 'mnm123',
  name: 'MNM Admin',
  role: 'Super Admin',
  avatar: null,
};

const ADMIN_STORE_KEY = 'mnm_mart_admin_v1';

const getInitialAdminData = () => {
  try {
    const saved = localStorage.getItem(ADMIN_STORE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

// ---------- Helper to get/sync orders/products from existing localStorage ----------
const ORDERS_KEY = 'mnm_mart_orders_v1';
const USERS_KEY = 'mnm_mart_user_v1';

const getOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const getCustomers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const user = raw ? JSON.parse(raw) : null;
    if (!user) return [];
    return [user];
  } catch { return []; }
};

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(getInitialAdminData);
  const [coupons, setCoupons] = useState(() => {
    try {
      const raw = localStorage.getItem('mnm_mart_coupons_v1');
      return raw ? JSON.parse(raw) : [
        { id: 'c1', code: 'MNM50', discount: 50, type: 'flat', minOrder: 299, expiry: '2026-12-31', active: true, uses: 12 },
        { id: 'c2', code: 'MNM100', discount: 100, type: 'flat', minOrder: 599, expiry: '2026-12-31', active: true, uses: 7 },
        { id: 'c3', code: 'FREEDELIVERY', discount: 40, type: 'delivery', minOrder: 0, expiry: '2026-12-31', active: true, uses: 21 },
      ];
    } catch { return []; }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const raw = localStorage.getItem('mnm_mart_reviews_v1');
      return raw ? JSON.parse(raw) : [
        { id: 'r1', product: 'Organic Apples', customer: 'Priya S.', rating: 5, comment: 'Absolutely fresh! Delivered in 35 mins.', date: '2026-08-17', status: 'approved', productId: 'p1' },
        { id: 'r2', product: 'Tata Tea Gold', customer: 'Rahul M.', rating: 4, comment: 'Good quality, packaging was intact.', date: '2026-08-16', status: 'pending', productId: 'p2' },
        { id: 'r3', product: 'Farm Fresh Eggs', customer: 'Meena K.', rating: 3, comment: 'Decent but 2 eggs were cracked.', date: '2026-08-15', status: 'approved', productId: 'p3' },
        { id: 'r4', product: 'Basmati Rice', customer: 'Arjun T.', rating: 5, comment: 'Best rice at this price!', date: '2026-08-14', status: 'pending', productId: 'p4' },
      ];
    } catch { return []; }
  });

  const [deliverySettings, setDeliverySettings] = useState(() => {
    try {
      const raw = localStorage.getItem('mnm_mart_delivery_settings_v1');
      return raw ? JSON.parse(raw) : {
        freeDeliveryAbove: 499,
        deliveryFee: 40,
        estimatedTime: '30-45 mins',
        partnerName: 'Raju Kumar',
        partnerPhone: '9876543210',
      };
    } catch { return { freeDeliveryAbove: 499, deliveryFee: 40, estimatedTime: '30-45 mins', partnerName: 'Raju Kumar', partnerPhone: '9876543210' }; }
  });

  const [storeInfo, setStoreInfo] = useState(() => {
    try {
      const raw = localStorage.getItem('mnm_mart_store_info_v1');
      return raw ? JSON.parse(raw) : {
        name: 'MNM MART',
        tagline: 'Fresh Groceries. Easy Shopping. Delivered to Your Doorstep.',
        address: 'Indiranagar, Bengaluru — 560038',
        phone: '+91 98765 43210',
        email: 'support@mnmmart.com',
        gst: 'GSTIN29AABCT1332L1ZX',
      };
    } catch { return {}; }
  });

  // Persist coupons & reviews
  useEffect(() => {
    localStorage.setItem('mnm_mart_coupons_v1', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('mnm_mart_reviews_v1', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('mnm_mart_delivery_settings_v1', JSON.stringify(deliverySettings));
  }, [deliverySettings]);

  useEffect(() => {
    localStorage.setItem('mnm_mart_store_info_v1', JSON.stringify(storeInfo));
  }, [storeInfo]);

  const adminLogin = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user = { ...ADMIN_CREDENTIALS, loggedAt: new Date().toISOString() };
      delete user.password;
      setAdminUser(user);
      localStorage.setItem(ADMIN_STORE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORE_KEY);
  };

  // ---- Coupon Actions ----
  const addCoupon = (coupon) => {
    const newC = { ...coupon, id: `c${Date.now()}`, uses: 0 };
    setCoupons(prev => [...prev, newC]);
  };
  const updateCoupon = (id, data) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };
  const deleteCoupon = (id) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };
  const toggleCoupon = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  // ---- Review Actions ----
  const approveReview = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };
  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // ---- Order Actions ----
  const getAllOrders = () => getOrders();
  const updateOrderStatus = (orderId, status) => {
    const orders = getOrders();
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status, updatedAt: new Date().toISOString() };
      }
      return o;
    });
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  const getAllCustomers = () => getCustomers();

  return (
    <AdminContext.Provider value={{
      adminUser,
      adminLogin,
      adminLogout,
      coupons, addCoupon, updateCoupon, deleteCoupon, toggleCoupon,
      reviews, approveReview, deleteReview,
      getAllOrders, updateOrderStatus,
      getAllCustomers,
      deliverySettings, setDeliverySettings,
      storeInfo, setStoreInfo,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
