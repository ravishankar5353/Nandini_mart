import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { AdminProvider } from './context/AdminContext';

// Layout components
import { Navbar } from './components/layout/Navbar';
import { CategoryBar } from './components/layout/CategoryBar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { AuthModal } from './components/modals/AuthModal';
import { AddressModal } from './components/modals/AddressModal';

// Customer pages
import { SplashPage } from './pages/SplashPage';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

// ─── Main Store Layout (with Navbar, Footer, MobileNav) ─────────────────────
const StoreLayout = () => {
  const location = useLocation();
  const isCheckoutOrSuccess =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/order-success');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      {!isCheckoutOrSuccess && <CategoryBar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
      <AuthModal />
      <AddressModal />
    </div>
  );
};

// ─── Root Router — Landing page / Auth / Admin vs Store ─────────────────────
const RootRouter = () => {
  return (
    <Routes>
      {/* 1. Landing Page (Default Splash) */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/splash" element={<SplashPage />} />

      {/* 2. Login / Sign Up Page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* 3. Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 4. Customer Store Pages */}
      <Route path="/home" element={<StoreLayout />} />
      <Route path="/shop/*" element={<StoreLayout />} />
      <Route path="/product/*" element={<StoreLayout />} />
      <Route path="/cart/*" element={<StoreLayout />} />
      <Route path="/checkout/*" element={<StoreLayout />} />
      <Route path="/order-success/*" element={<StoreLayout />} />
      <Route path="/track-order/*" element={<StoreLayout />} />
      <Route path="/orders/*" element={<StoreLayout />} />
      <Route path="/wishlist/*" element={<StoreLayout />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AdminProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <Router>
                  <RootRouter />
                </Router>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </AdminProvider>
    </ToastProvider>
  );
}
