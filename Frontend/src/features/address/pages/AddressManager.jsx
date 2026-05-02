import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Plus, MapPin, Pencil, Trash2, X, AlertTriangle } from "lucide-react";

const AddressManager = ({ selectedAddress, onSelectAddress }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    town: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternateMobile: "",
    isDefault: false,
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get("/api/addresses", {
          withCredentials: true,
        });
        if (res.data?.data) {
          setAddresses(res.data.data);
          if (res.data.data.length > 0) {
            const defaultAddr =
              res.data.data.find((a) => a.isDefault) || res.data.data[0];
            onSelectAddress(defaultAddr);
          }
        }
      } catch (err) {
        console.log("Failed to fetch addresses");
      }
    };
    fetchAddresses();
  }, [onSelectAddress]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        const res = await axios.put(
          `/api/addresses/update/${editingAddress._id}`,
          addressForm,
          { withCredentials: true },
        );
        setAddresses(
          addresses.map((a) =>
            a._id === editingAddress._id ? res.data.data : a,
          ),
        );
        if (selectedAddress?._id === editingAddress._id) {
          onSelectAddress(res.data.data);
        }
        toast.success("Address updated successfully");
      } else {
        const res = await axios.post("/api/addresses/create", addressForm, {
          withCredentials: true,
        });
        setAddresses([...addresses, res.data.data]);
        onSelectAddress(res.data.data);
        toast.success("Address added successfully");
      }
      setIsAddressModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    }
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      fullName: addr.fullName || "",
      mobile: addr.mobile || "",
      pincode: addr.pincode || "",
      town: addr.town || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      landmark: addr.landmark || "",
      alternateMobile: addr.alternateMobile || "",
      isDefault: addr.isDefault || false,
    });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`/api/addresses/delete/${id}`, {
        withCredentials: true,
      });
      const newAddresses = addresses.filter((a) => a._id !== id);
      setAddresses(newAddresses);
      if (selectedAddress?._id === id) {
        onSelectAddress(newAddresses.length > 0 ? newAddresses[0] : null);
      }
      toast.success("Address deleted successfully");
    } catch (err) {
      toast.error("Failed to delete address");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <>
      <div className="animate-cart-fade rounded-[2rem] border border-[#e6dfd5] bg-white p-6 sm:p-7 shadow-[0_18px_40px_rgba(27,28,26,0.03)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-[1.8rem] leading-none text-[#1b1c1a]">
            Delivery Address
          </h2>
          <button
            onClick={() => {
              setEditingAddress(null);
              setAddressForm({
                fullName: "",
                mobile: "",
                pincode: "",
                town: "",
                address: "",
                city: "",
                state: "",
                landmark: "",
                alternateMobile: "",
                isDefault: false,
              });
              setIsAddressModalOpen(true);
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3eee8] text-[#1b1c1a] transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#543d0c] active:scale-95"
          >
            <Plus size={18} />
          </button>
        </div>

        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`rounded-[1.5rem] border ${selectedAddress?._id === addr._id ? "border-[#C9A96E] bg-[#fbf9f6]" : "border-[#e6dfd5]/60 bg-transparent"} p-5 cursor-pointer transition-colors`}
                onClick={() => onSelectAddress(addr)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-[13px] font-semibold tracking-wide text-[#1b1c1a] uppercase">
                      {addr.fullName}
                    </p>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-[#f3eee8] text-[#7a6e63] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 text-[#7a6e63]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(addr);
                      }}
                      className="hover:text-[#C9A96E] transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmId(addr._id);
                      }}
                      className="hover:text-[#ba1a1a] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 font-sans text-sm text-[#7a6e63]">
                  <p>
                    {addr.address}, {addr.town}
                  </p>
                  <p>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                  <p className="pt-2 text-[#1b1c1a] font-medium">
                    Phone: {addr.mobile}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#d0c5b5] bg-transparent p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eee8] text-[#7a6e63]">
              <MapPin size={20} />
            </div>
            <p className="text-sm text-[#7a6e63]">No address saved</p>
          </div>
        )}
      </div>

      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1b1c1a]/20 backdrop-blur-md transition-opacity"
            onClick={() => setIsAddressModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-[#d0c5b5]/20 bg-[#fbf9f6]/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_40px_80px_rgba(27,28,26,0.1)]">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-[2.5rem] leading-none text-[#1b1c1a]">
                {editingAddress ? "Update Address" : "New Address"}
              </h2>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3eee8] text-[#1b1c1a] transition-all hover:bg-[#e8e2da] active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={addressForm.mobile}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, mobile: e.target.value })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.pincode}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        pincode: e.target.value,
                      })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="6-digit pincode"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Locality / Town
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.town}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, town: e.target.value })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Locality or town"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Address (Area & Street)
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.address}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Area, Street, Sector, Village"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    City / District
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, city: e.target.value })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="City or District"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, state: e.target.value })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressForm.landmark}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        landmark: e.target.value,
                      })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="e.g. Near Apollo Hospital"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Alternate Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={addressForm.alternateMobile}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        alternateMobile: e.target.value,
                      })
                    }
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Alternate number"
                  />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="w-full cursor-pointer rounded-full border border-[#d0c5b5] bg-transparent px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1b1c1a] transition-all hover:border-[#1b1c1a] active:scale-[0.99]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-full bg-[#C9A96E] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#543d0c] transition-all hover:bg-[#b0935d] hover:text-white active:scale-[0.99] shadow-[0_20px_40px_rgba(201,169,110,0.15)]"
                >
                  {editingAddress ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1b1c1a]/30 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative w-full max-w-sm rounded-[2.5rem] border border-[#e6dfd5] bg-[#fbf9f6] p-8 shadow-[0_40px_80px_rgba(27,28,26,0.12)] text-center">
            {/* Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eee8]">
              <AlertTriangle size={28} className="text-[#C9A96E]" />
            </div>

            <h3 className="font-serif text-[1.8rem] leading-tight text-[#1b1c1a] mb-2">
              Delete Address
            </h3>
            <p className="font-sans text-sm text-[#7a6e63] mb-8 leading-relaxed">
              This address will be permanently removed from your account. This
              action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-full cursor-pointer rounded-full border border-[#d0c5b5] bg-transparent px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1b1c1a] transition-all hover:border-[#1b1c1a] active:scale-[0.99]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAddress(deleteConfirmId)}
                className="w-full cursor-pointer rounded-full bg-[#1b1c1a] px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#ba1a1a] active:scale-[0.99]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressManager;
