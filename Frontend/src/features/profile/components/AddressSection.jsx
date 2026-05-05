import React from "react";
import AddressManager from "../../address/pages/AddressManager";

const AddressSection = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-4xl text-[#1b1c1a]">Managed Addresses</h2>
        <p className="font-serif italic text-[#7a6e63]">
          Where your acquisitions meet their destination.
        </p>
      </div>
      <AddressManager />
    </div>
  );
};

export default AddressSection;
