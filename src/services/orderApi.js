import { INITIAL_ORDERS } from '../data/initialData';

const STORAGE_KEY = 'nandini_mart_orders_v1';
const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
};

const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage:', err);
  }
};

export const orderApi = {
  async getOrders() {
    await delay(300);
    return getStoredOrders();
  },

  async getOrderById(orderId) {
    await delay(250);
    const orders = getStoredOrders();
    const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (!order) throw new Error(`Order #${orderId} not found.`);
    return { ...order };
  },

  async createOrder({ items, address, paymentMethod, billDetails }) {
    await delay(600); // realistic payment & order creation delay

    if (!address || !address.houseNo || !address.pincode) {
      throw new Error('Valid doorstep delivery address is required.');
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NDN-2026-${randomSuffix}`;
    const now = new Date();

    const newOrder = {
      id: orderId,
      date: now.toISOString(),
      status: 'Order Placed',
      statusCode: 1, // 1: Placed, 2: Packed, 3: Out for Delivery, 4: Delivered
      deliveryMethod: '🏠 Doorstep Delivery — Mandatory',
      address: { ...address },
      items: [...items],
      itemTotal: billDetails.itemTotal,
      discount: billDetails.discount,
      deliveryFee: billDetails.deliveryFee,
      handlingFee: billDetails.handlingFee || 4,
      total: billDetails.total,
      paymentMethod,
      estimatedDelivery: 'Within 30-45 Minutes at your doorstep',
      deliveryPartner: {
        name: 'Suresh Gowda',
        rating: '4.9 ⭐',
        phone: '+91 98450 12345',
        vehicle: 'Eco Electric Scooter (KA-01-NM-8822)',
        otp: `${Math.floor(1000 + Math.random() * 9000)}`
      },
      timeline: [
        {
          status: 'Order Placed',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          completed: true,
          desc: 'Your grocery order was received by NANDINI MART'
        },
        {
          status: 'Order Confirmed & Packed',
          time: 'In 5-10 mins',
          completed: false,
          desc: 'Items checked, fresh packed & hygienically sealed'
        },
        {
          status: 'Out for Doorstep Delivery',
          time: 'In 15-20 mins',
          completed: false,
          desc: 'Delivery partner will bring your package right to your door'
        },
        {
          status: 'Delivered at Doorstep',
          time: 'In 30-40 mins',
          completed: false,
          desc: 'Handover at doorstep with OTP verification'
        }
      ]
    };

    const currentOrders = getStoredOrders();
    const updatedOrders = [newOrder, ...currentOrders];
    saveStoredOrders(updatedOrders);

    return newOrder;
  },

  async updateOrderStatus(orderId, statusCode) {
    await delay(200);
    const orders = getStoredOrders();
    const target = orders.find(o => o.id === orderId);
    if (!target) return null;

    target.statusCode = statusCode;
    const statusMap = {
      1: 'Order Placed',
      2: 'Preparing Order',
      3: 'Out for Delivery',
      4: 'Delivered'
    };
    target.status = statusMap[statusCode] || target.status;

    target.timeline = target.timeline.map((stage, idx) => ({
      ...stage,
      completed: idx < statusCode
    }));

    saveStoredOrders(orders);
    return { ...target };
  }
};
