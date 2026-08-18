import React, { createContext, useContext, useState, useEffect } from 'react';
import { userApi } from '../services/userApi';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const initUser = async () => {
      try {
        const u = await userApi.getCurrentUser();
        setUser(u);
        const defaultAddr = u.addresses?.find(a => a.isDefault) || u.addresses?.[0];
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    initUser();
  }, []);

  const login = async (emailOrPhone, password) => {
    try {
      const u = await userApi.login(emailOrPhone, password);
      setUser(u);
      addToast(`Welcome back, ${u.name}! 👋`, 'success');
      setIsAuthModalOpen(false);
      return true;
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      return false;
    }
  };

  const signup = async (data) => {
    try {
      const u = await userApi.signup(data);
      setUser(u);
      addToast(`Account created! Welcome to MNM MART, ${u.name}! 🎉`, 'success');
      setIsAuthModalOpen(false);
      return true;
    } catch (err) {
      addToast(err.message || 'Signup failed', 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    addToast('Logged out successfully.', 'info');
  };

  const addAddress = async (addressData) => {
    try {
      const updatedUser = await userApi.addAddress(addressData);
      setUser(updatedUser);
      const newAddr = updatedUser.addresses[updatedUser.addresses.length - 1];
      if (newAddr) setSelectedAddressId(newAddr.id);
      addToast('Doorstep delivery address saved! 🏠', 'success');
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      return true;
    } catch (err) {
      addToast(err.message || 'Failed to add address', 'error');
      return false;
    }
  };

  const updateAddress = async (id, data) => {
    try {
      const updatedUser = await userApi.updateAddress(id, data);
      setUser(updatedUser);
      addToast('Delivery address updated! ✏️', 'success');
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      return true;
    } catch (err) {
      addToast(err.message || 'Failed to update address', 'error');
      return false;
    }
  };

  const deleteAddress = async (id) => {
    try {
      const updatedUser = await userApi.deleteAddress(id);
      setUser(updatedUser);
      if (selectedAddressId === id) {
        const remaining = updatedUser.addresses[0];
        setSelectedAddressId(remaining ? remaining.id : null);
      }
      addToast('Address removed', 'info');
    } catch (err) {
      addToast(err.message || 'Failed to delete address', 'error');
    }
  };

  const selectDeliveryAddress = (id) => {
    setSelectedAddressId(id);
    const chosen = user?.addresses?.find(a => a.id === id);
    if (chosen) {
      addToast(`Doorstep delivery set to ${chosen.area || chosen.city}`, 'info');
    }
  };

  const activeDeliveryAddress = user?.addresses?.find(a => a.id === selectedAddressId) || user?.addresses?.[0] || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        selectDeliveryAddress,
        selectedAddressId,
        activeDeliveryAddress,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isAddressModalOpen,
        editingAddress,
        openAddressModal: (addressToEdit = null) => {
          setEditingAddress(addressToEdit);
          setIsAddressModalOpen(true);
        },
        closeAddressModal: () => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
