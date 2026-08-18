import React, { useState, useEffect } from 'react';
import { X, MapPin, Home, Building2, User, Phone, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AddressModal = () => {
  const { isAddressModalOpen, closeAddressModal, editingAddress, addAddress, updateAddress } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    houseNo: '',
    street: '',
    area: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    type: 'Home',
    isDefault: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        fullName: editingAddress.fullName || '',
        phone: editingAddress.phone || '',
        houseNo: editingAddress.houseNo || '',
        street: editingAddress.street || '',
        area: editingAddress.area || '',
        city: editingAddress.city || 'Bengaluru',
        state: editingAddress.state || 'Karnataka',
        pincode: editingAddress.pincode || '560038',
        type: editingAddress.type || 'Home',
        isDefault: editingAddress.isDefault ?? false
      });
    } else {
      setFormData({
        fullName: 'Nandini Sharma',
        phone: '9876543210',
        houseNo: 'Flat 402, Green Meadows Heights',
        street: '14th Main Road, Near Rose Garden',
        area: 'Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        type: 'Home',
        isDefault: true
      });
    }
  }, [editingAddress, isAddressModalOpen]);

  if (!isAddressModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingAddress) {
      await updateAddress(editingAddress.id, formData);
    } else {
      await addAddress(formData);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 relative shrink-0">
          <button
            onClick={closeAddressModal}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1 rounded-full bg-emerald-950/40 hover:bg-emerald-950/80 transition-colors"
            aria-label="Close address modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold tracking-wider uppercase border border-emerald-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Mandatory Doorstep Delivery Address
            </span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-300" />
            {editingAddress ? 'Edit Doorstep Delivery Address' : 'Add New Doorstep Delivery Address'}
          </h2>
          <p className="text-xs text-emerald-200 mt-0.5">
            Please enter complete address details for guaranteed contactless doorstep delivery.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {/* Recipient info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Recipient's Name"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (for OTP & Calling) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* House / Flat */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Flat / House No. / Building Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Flat 402, Green Meadows Heights"
              value={formData.houseNo}
              onChange={e => setFormData({ ...formData, houseNo: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
            />
          </div>

          {/* Street & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Street / Road Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 14th Main Road"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Area / Colony / Landmark *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Indiranagar, Near Park"
                value={formData.area}
                onChange={e => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>
          </div>

          {/* City, State, PIN */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                placeholder="Bengaluru"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                placeholder="Karnataka"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="560038"
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Address Type
            </label>
            <div className="flex gap-2">
              {['Home', 'Work', 'Other'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    formData.type === type
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {type === 'Home' && <Home className="w-3.5 h-3.5" />}
                  {type === 'Work' && <Building2 className="w-3.5 h-3.5" />}
                  {type === 'Other' && <MapPin className="w-3.5 h-3.5" />}
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Default address checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="defaultAddressCheckbox"
              checked={formData.isDefault}
              onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="defaultAddressCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Set as primary doorstep delivery address
            </label>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingAddress ? 'Update Delivery Address' : 'Save Doorstep Address'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
