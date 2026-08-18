export const INITIAL_USER = {
  id: 'usr-001',
  name: 'MNM User',
  email: 'mnm@mnmmart.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'MNM User',
      phone: '9876543210',
      houseNo: 'Flat 402, Green Meadows Heights',
      street: '14th Main Road, Near Rose Garden',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'Home',
      isDefault: true
    },
    {
      id: 'addr-2',
      fullName: 'MNM User (Office)',
      phone: '9876543210',
      houseNo: 'Tech Park Tower 3, 5th Floor',
      street: 'Outer Ring Road, Bellandur',
      area: 'Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      type: 'Work',
      isDefault: false
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'MNM-2026-88412',
    date: '2026-08-18T10:30:00.000Z',
    status: 'Out for Delivery',
    statusCode: 3, // 1: Placed, 2: Packed/Preparing, 3: Out for Delivery, 4: Delivered
    deliveryMethod: '🏠 Doorstep Delivery — Mandatory',
    address: {
      fullName: 'MNM User',
      phone: '9876543210',
      houseNo: 'Flat 402, Green Meadows Heights',
      street: '14th Main Road, Near Rose Garden',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'Home'
    },
    items: [
      {
        id: 'prod-001',
        name: 'Fresh Kashmiri Red Apples',
        price: 169,
        quantity: 2,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-013',
        name: 'MNM Toned Fresh Milk (Pasteurized)',
        price: 52,
        quantity: 2,
        unit: '1 Litre Pouch',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-016',
        name: 'Fresh Malai Paneer (Cottage Cheese)',
        price: 89,
        quantity: 1,
        unit: '200 g Vacuum Pack',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'
      }
    ],
    itemTotal: 531,
    discount: 50,
    deliveryFee: 0,
    handlingFee: 4,
    total: 485,
    paymentMethod: 'UPI (GPay)',
    estimatedDelivery: 'Today by 11:30 AM (In 25 Mins)',
    deliveryPartner: {
      name: 'Ramesh Kumar',
      rating: '4.9 ⭐',
      phone: '+91 91234 56789',
      vehicle: 'Electric Scooter (KA-03-EM-4921)',
      otp: '4928'
    },
    timeline: [
      { status: 'Order Placed', time: '10:30 AM', completed: true, desc: 'Your grocery order was received by MNM MART' },
      { status: 'Order Confirmed & Packed', time: '10:42 AM', completed: true, desc: 'Items checked, fresh packed & hygienically sealed' },
      { status: 'Out for Doorstep Delivery', time: '11:05 AM', completed: true, desc: 'Delivery partner Ramesh Kumar is on the way to your door' },
      { status: 'Delivered at Doorstep', time: 'Est. 11:30 AM', completed: false, desc: 'Will be handed directly at your doorstep' }
    ]
  },
  {
    id: 'MNM-2026-79104',
    date: '2026-08-15T16:15:00.000Z',
    status: 'Delivered',
    statusCode: 4,
    deliveryMethod: '🏠 Doorstep Delivery — Mandatory',
    address: {
      fullName: 'MNM User',
      phone: '9876543210',
      houseNo: 'Flat 402, Green Meadows Heights',
      street: '14th Main Road, Near Rose Garden',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'Home'
    },
    items: [
      {
        id: 'prod-019',
        name: 'Daawat Rozana Gold Basmati Rice',
        price: 435,
        quantity: 1,
        unit: '5 kg Bag',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-025',
        name: 'Tata Sampann Unpolished Toor Dal',
        price: 169,
        quantity: 2,
        unit: '1 kg Pack',
        image: 'https://images.unsplash.com/photo-1599818816829-478648c69131?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-040',
        name: 'MNM Pure Cow Desi Ghee',
        price: 315,
        quantity: 1,
        unit: '500 ml Jar',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'
      }
    ],
    itemTotal: 1088,
    discount: 100,
    deliveryFee: 0,
    handlingFee: 4,
    total: 992,
    paymentMethod: 'Credit Card',
    estimatedDelivery: 'Delivered on Aug 15, 2026',
    deliveryPartner: {
      name: 'Vikas Gowda',
      rating: '4.8 ⭐',
      phone: '+91 98877 66554',
      vehicle: 'Delivery Van',
      otp: '7182'
    },
    timeline: [
      { status: 'Order Placed', time: '04:15 PM, Aug 15', completed: true, desc: 'Order received' },
      { status: 'Order Confirmed & Packed', time: '04:30 PM, Aug 15', completed: true, desc: 'Packed at Hub' },
      { status: 'Out for Doorstep Delivery', time: '04:55 PM, Aug 15', completed: true, desc: 'Out with delivery executive' },
      { status: 'Delivered at Doorstep', time: '05:22 PM, Aug 15', completed: true, desc: 'Delivered successfully at customer doorstep' }
    ]
  }
];
