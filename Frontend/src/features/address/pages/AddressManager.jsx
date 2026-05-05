import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, MapPin, Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAddress from "../hooks/useAddress.js";
import { addressFormSchema } from "../validation/Address.validation.js";

const initialAddressForm = {
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
};

const AddressManager = ({
  selectedAddress: selectedAddressProp,
  onSelectAddress,
  isCartPage = false,
}) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: initialAddressForm,
    mode: "onBlur",
  });

  const {
    addresses,
    selectedAddress,
    isLoading,
    handleGetAddresses,
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSelectAddress,
  } = useAddress();

  const activeSelectedAddress = selectedAddressProp || selectedAddress;

  useEffect(() => {
    handleGetAddresses().catch(() => {});
  }, [handleGetAddresses]);

  useEffect(() => {
    if (!onSelectAddress) return;
    onSelectAddress(selectedAddress || null);
  }, [selectedAddress, onSelectAddress]);

  const resetFormAndOpen = () => {
    setEditingAddress(null);
    reset(initialAddressForm);
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        isDefault: editingAddress
          ? Boolean(editingAddress?.isDefault)
          : Boolean(formData.isDefault),
      };

      if (editingAddress?._id) {
        const res = await handleUpdateAddress(editingAddress._id, payload);
        handleSelectAddress(res?.data || null);
        toast.success("Address updated successfully");
      } else {
        const res = await handleCreateAddress(payload);
        handleSelectAddress(res?.data || null);
        toast.success("Address added successfully");
      }
      setIsAddressModalOpen(false);
      reset(initialAddressForm);
      setEditingAddress(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save address");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    reset({
      fullName: address?.fullName || "",
      mobile: address?.mobile || "",
      pincode: address?.pincode || "",
      town: address?.town || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
      landmark: address?.landmark || "",
      alternateMobile: address?.alternateMobile || "",
      isDefault: Boolean(address?.isDefault),
    });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddressById = async (id) => {
    try {
      await handleDeleteAddress(id);
      toast.success("Address deleted successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete address");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <>
      <div className="animate-cart-fade rounded-[2rem] border border-[#e6dfd5] bg-white p-6 sm:p-7 shadow-[0_18px_40px_rgba(27,28,26,0.03)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-[1.8rem] leading-none text-[#1b1c1a]">
            Delivery Address
          </h2>
          <button
            onClick={resetFormAndOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3eee8] text-[#1b1c1a] transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#543d0c] active:scale-95"
          >
            <Plus size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="rounded-[1.5rem] border border-dashed border-[#d0c5b5] bg-transparent p-6 text-center">
            <p className="text-sm text-[#7a6e63]">Loading addresses...</p>
          </div>
        ) : addresses.length > 0 ? (
          <div
            className={`space-y-4  overflow-y-scroll ${isCartPage ? "max-h-[250px]" : "max-h-[450px]"}`}
          >
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`cursor-pointer rounded-[1.5rem] border p-5 transition-colors ${
                  activeSelectedAddress?._id === address._id
                    ? "border-[#C9A96E] bg-[#fbf9f6]"
                    : "border-[#e6dfd5]/60 bg-transparent"
                }`}
                onClick={async () => {
                  handleSelectAddress(address);
                  if (!address.isDefault) {
                    try {
                      await handleUpdateAddress(address._id, {
                        isDefault: true,
                      });
                      await handleGetAddresses();
                    } catch (error) {
                      console.error("Failed to set address as default", error);
                    }
                  }
                }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-[13px] font-semibold uppercase tracking-wide text-[#1b1c1a]">
                      {address.fullName}
                    </p>
                    {address.isDefault && (
                      <span className="rounded-full bg-[#f3eee8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7a6e63]">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 text-[#7a6e63]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(address);
                      }}
                      className="cursor-pointer transition-colors hover:text-[#C9A96E]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmId(address._id);
                      }}
                      className="cursor-pointer transition-colors hover:text-[#ba1a1a]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 font-sans text-sm text-[#7a6e63]">
                  <p>
                    {address.address}, {address.town}
                  </p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  {address.landmark && <p>Landmark: {address.landmark}</p>}
                  <p className="pt-2 font-medium text-[#1b1c1a]">
                    Phone: {address.mobile}
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
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[3rem] border border-[#d0c5b5]/20 bg-[#fbf9f6]/95 p-6 shadow-[0_40px_80px_rgba(27,28,26,0.1)] backdrop-blur-xl sm:p-8">
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

            <form
              onSubmit={handleSubmit(handleAddressSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    {...register("mobile")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobile && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Pincode
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    {...register("pincode")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="6-digit pincode"
                  />
                  {errors.pincode && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Locality / Town
                  </label>
                  <input
                    type="text"
                    {...register("town")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Locality or town"
                  />
                  {errors.town && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.town.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Address (Area & Street)
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Area, Street, Sector, Village"
                  />
                  {errors.address && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    City / District
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="City or District"
                  />
                  {errors.city && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    State
                  </label>
                  <input
                    type="text"
                    {...register("state")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    {...register("landmark")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="e.g. Near Apollo Hospital"
                  />
                  {errors.landmark && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.landmark.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a6e63]">
                    Alternate Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    {...register("alternateMobile")}
                    className="w-full border-b border-[#d0c5b5]/40 bg-transparent py-3 font-sans text-base text-[#1b1c1a] outline-none transition-colors focus:border-[#C9A96E]"
                    placeholder="Alternate number"
                  />
                  {errors.alternateMobile && (
                    <p className="text-xs text-[#ba1a1a]">
                      {errors.alternateMobile.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="w-full cursor-pointer rounded-full border border-[#d0c5b5] bg-transparent px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1b1c1a] transition-all hover:border-[#1b1c1a] active:scale-[0.99]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-full bg-[#C9A96E] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#543d0c] shadow-[0_20px_40px_rgba(201,169,110,0.15)] transition-all hover:bg-[#b0935d] hover:text-white active:scale-[0.99]"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingAddress
                      ? "Update Address"
                      : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1b1c1a]/30 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative w-full max-w-sm rounded-[2.5rem] border border-[#e6dfd5] bg-[#fbf9f6] p-8 text-center shadow-[0_40px_80px_rgba(27,28,26,0.12)]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eee8]">
              <AlertTriangle size={28} className="text-[#C9A96E]" />
            </div>

            <h3 className="mb-2 font-serif text-[1.8rem] leading-tight text-[#1b1c1a]">
              Delete Address
            </h3>
            <p className="mb-8 font-sans text-sm leading-relaxed text-[#7a6e63]">
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
                onClick={() => handleDeleteAddressById(deleteConfirmId)}
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
