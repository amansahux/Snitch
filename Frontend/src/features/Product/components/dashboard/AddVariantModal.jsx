import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import {
  InputField,
  SubmitButton,
  SelectField,
} from "../CreateProduct/FormElements";
import { ImageUploadZone } from "../CreateProduct/ImageUploadZone";
import { addVariantSchema } from "../../validation/product.validation.js";



const AddVariantModal = ({ isOpen, onClose, onAdd }) => {
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(addVariantSchema),
    defaultValues: {
      size: "M",
      fit: "Regular",
      material: "Cotton",
      price: {
        mrp: 0,
        selling: 0,
        currency: "INR",
      },
      stock: 0,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setImages([]);
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("fit", data.fit);
    formData.append("material", data.material);
    formData.append("stock", data.stock);

    formData.append(
      "price",
      JSON.stringify({
        mrp: data.price.mrp,
        selling: data.price.selling,
        currency: "INR",
      }),
    );

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    // 🔥 Proper way to log FormData
    // console.log("FormData Content:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    // Uncomment this when you're ready to send it to the backend
    // console.log(formData)
    await onAdd(formData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div
        className="absolute inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-[#fbf9f6] w-full max-w-4xl rounded-[2.5rem] shadow-luxury overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-10 py-8 border-b border-[#e8e2da]">
          <div>
            <h2 className="text-3xl font-serif text-[#1b1c1a]">
              Archive Variation
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-[#7a6e63] mt-2">
              Define specific dimensions and technical specs
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-3 bg-white rounded-full text-[#7a6e63] hover:text-[#1b1c1a] transition-all border border-[#e8e2da]"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 space-y-10 max-h-[75vh] overflow-y-auto no-scrollbar"
        >
          {/* Visual Gallery */}
          <section className="bg-white p-8 rounded-3xl border border-[#e8e2da]/40 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a]">
              Variant Gallery (Max 7)
            </h3>
            <ImageUploadZone
              images={images}
              onChange={setImages}
              maxImages={7}
            />
          </section>

          {/* Primary Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="size"
                  label="Size"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "XS", value: "XS" },
                    { label: "S", value: "S" },
                    { label: "M", value: "M" },
                    { label: "L", value: "L" },
                    { label: "XL", value: "XL" },
                    { label: "XXL", value: "XXL" },
                  ]}
                  error={errors.size?.message}
                />
              )}
            />

            <InputField
              id="color"
              label="Color / Wash"
              placeholder="e.g. Midnight Black"
              error={errors.color?.message}
              {...register("color")}
            />

            <Controller
              name="fit"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="fit"
                  label="Fit Type"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Slim", value: "Slim" },
                    { label: "Regular", value: "Regular" },
                    { label: "Relaxed", value: "Relaxed" },
                    { label: "Oversized", value: "Oversized" },
                  ]}
                  error={errors.fit?.message}
                />
              )}
            />

            <InputField
              id="material"
              label="Material"
              placeholder="e.g. Premium Cotton"
              error={errors.material?.message}
              {...register("material")}
            />
          </div>

          {/* Inventory & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              id="mrp"
              label="MRP (₹)"
              type="number"
              error={errors.price?.mrp?.message}
              {...register("price.mrp")}
            />
            <InputField
              id="price_selling"
              label="Selling Price (₹)"
              type="number"
              error={errors.price?.selling?.message}
              {...register("price.selling")}
            />
            <InputField
              id="stock"
              label="Stock Available"
              type="number"
              error={errors.stock?.message}
              {...register("stock")}
            />
          </div>

          <div className="pt-6 flex justify-end gap-6 border-t border-[#e8e2da]/40">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#7a6e63] hover:text-[#1b1c1a] transition-colors"
            >
              Discard Changes
            </button>
            <SubmitButton isLoading={isSubmitting}>
              Unveil Variation
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariantModal;
