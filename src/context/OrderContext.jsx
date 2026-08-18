import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { orderApi } from '../services/orderApi';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();
  const { addToast } = useToast();

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderApi.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const placeOrder = async ({ items, address, paymentMethod, billDetails }) => {
    try {
      const newOrder = await orderApi.createOrder({
        items,
        address,
        paymentMethod,
        billDetails
      });
      setOrders(prev => [newOrder, ...prev]);
      clearCart();
      addToast(`🎉 Order #${newOrder.id} placed successfully!`, 'success');
      return newOrder;
    } catch (err) {
      addToast(err.message || 'Failed to place order', 'error');
      throw err;
    }
  };

  const getOrderById = (orderId) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase()) || null;
  };

  const simulateNextStatus = async (orderId) => {
    const order = getOrderById(orderId);
    if (!order) return;

    let nextCode = (order.statusCode || 1) + 1;
    if (nextCode > 4) nextCode = 1; // loop back for testing

    try {
      const updated = await orderApi.updateOrderStatus(orderId, nextCode);
      if (updated) {
        setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
        addToast(`Tracking updated: ${updated.status} 🚀`, 'info');
      }
    } catch (err) {
      console.error('Failed to update tracking status:', err);
    }
  };

  const activeOrdersCount = orders.filter(o => o.statusCode < 4).length;

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
        getOrderById,
        simulateNextStatus,
        refreshOrders: fetchOrders,
        activeOrdersCount
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
