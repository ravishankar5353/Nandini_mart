import { INITIAL_USER } from '../data/initialData';

const USER_STORAGE_KEY = 'mnm_mart_user_v1';
const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_USER));
      return INITIAL_USER;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USER;
  }
};

const saveStoredUser = (user) => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save user to localStorage:', err);
  }
};

export const userApi = {
  async getCurrentUser() {
    await delay(200);
    return getStoredUser();
  },

  async login(emailOrPhone, password) {
    await delay(400);
    const user = getStoredUser();
    // Demo login always succeeds
    return {
      ...user,
      email: emailOrPhone.includes('@') ? emailOrPhone : user.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : user.phone,
      isAuthenticated: true
    };
  },

  async signup(userData) {
    await delay(400);
    const user = getStoredUser();
    const newUser = {
      ...user,
      name: userData.name || 'MNM Customer',
      email: userData.email || 'customer@mnmmart.com',
      phone: userData.phone || '+91 98765 00000',
      isAuthenticated: true
    };
    saveStoredUser(newUser);
    return newUser;
  },

  async addAddress(newAddr) {
    await delay(250);
    const user = getStoredUser();
    const address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 || newAddr.isDefault
    };

    let updatedAddresses = [...user.addresses];
    if (address.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(address);

    const updatedUser = { ...user, addresses: updatedAddresses };
    saveStoredUser(updatedUser);
    return updatedUser;
  },

  async updateAddress(addressId, updatedFields) {
    await delay(200);
    const user = getStoredUser();
    let updatedAddresses = user.addresses.map(addr => {
      if (addr.id === addressId) {
        return { ...addr, ...updatedFields };
      }
      if (updatedFields.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    const updatedUser = { ...user, addresses: updatedAddresses };
    saveStoredUser(updatedUser);
    return updatedUser;
  },

  async deleteAddress(addressId) {
    await delay(200);
    const user = getStoredUser();
    let updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
    if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }

    const updatedUser = { ...user, addresses: updatedAddresses };
    saveStoredUser(updatedUser);
    return updatedUser;
  },

  async setDefaultAddress(addressId) {
    await delay(150);
    const user = getStoredUser();
    const updatedAddresses = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === addressId
    }));
    const updatedUser = { ...user, addresses: updatedAddresses };
    saveStoredUser(updatedUser);
    return updatedUser;
  }
};
