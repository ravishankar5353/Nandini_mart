import React from 'react';
import { X, MapPin, Plus, Check, Home, Building2, Trash2, Edit2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DeliveryAddressSelectorModal = ({ isOpen, onClose }) => {
  const { user, selectedAddressId, selectDeliveryAddress, openAddressModal, deleteAddress } = useAuth();

  if (!isOpen) return null;

  const handleSelect = (id) => {
    selectDeliveryAddress(id);
    onClose();
  };

  const handleEdit = (e, addr) => {
    e.stopPropagation();
    onClose();
    openAddressModal(addr);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteAddress(id);
  };

  const handleAddNew = () => {
    onClose();
    openAddressModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-semibold mb-1">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>Doorstep Delivery Destination</span>
            </div>
            <h3 className="text-xl font-black text-white">Select Delivery Location</h3>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-950/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Address list */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <p className="text-xs text-slate-500 font-medium">
            Doorstep delivery is mandatory. Choose where you want your fresh groceries delivered:
          </p>

          {user?.addresses && user.addresses.length > 0 ? (
            user.addresses.map(addr => {
              const isSelected = addr.id === selectedAddressId;
              return (
                <div
                  key={addr.id}
                  onClick={() => handleSelect(addr.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {addr.type === 'Work' ? <Building2 className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {addr.fullName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                          {addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                        {addr.houseNo}, {addr.street}, {addr.area}, {addr.city}, {addr.state} - <strong className="text-slate-900">{addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Phone: <span className="font-semibold text-slate-700">{addr.phone}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 mt-1">
                      <button
                        onClick={(e) => handleEdit(e, addr)}
                        className="p-1 text-slate-400 hover:text-emerald-700 rounded transition-colors"
                        title="Edit address"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {user.addresses.length > 1 && (
                        <button
                          onClick={(e) => handleDelete(e, addr.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete address"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-slate-500 text-xs">
              No delivery address saved yet. Please add one below!
            </div>
          )}

          <button
            onClick={handleAddNew}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-emerald-400 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-100/50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-all mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Doorstep Delivery Address</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>All deliveries are contactless and verified with doorstep OTP.</span>
        </div>
      </div>
    </div>
  );
};
