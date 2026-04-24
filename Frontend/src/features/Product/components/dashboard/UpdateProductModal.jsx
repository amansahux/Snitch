import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import {
  InputField,
  TextAreaField,
  SelectField,
  SubmitButton,
} from "../CreateProduct/FormElements";
import { updateProductSchema } from "../../validation/product.validation";

const UpdateProductModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [images, setImages] = React.useState([]);
  const initialImagesLoaded = React.useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category || "",
    },
  });

  const categoryValue = watch("category");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (product && !initialImagesLoaded.current) {
        reset({
          title: product.title,
          description: product.description,
          category: product.category,
        });

        const existing = (product.images || []).map((img) => ({
          id: img._id || Math.random().toString(36).substring(7),
          preview: img.url,
          file: null,
          isExisting: true,
        }));
        setImages(existing);
        initialImagesLoaded.current = true;
      }
    } else {
      document.body.style.overflow = "unset";
      initialImagesLoaded.current = false;
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, product, reset]);

  if (!isOpen) return null;

  const categories = [
    { value: "Tops", label: "Tops" },
    { value: "Bottoms", label: "Bottoms" },
    { value: "Outerwear", label: "Outerwear" },
    { value: "Footwear", label: "Footwear" },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    const existingUrls = images
      .filter((img) => img.isExisting)
      .map((img) => img.preview);
    
    images
      .filter((img) => !img.isExisting)
      .forEach((img) => {
        formData.append("images", img.file);
      });

    formData.append("existingImages", JSON.stringify(existingUrls));

    await onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div
        className="absolute inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#fbf9f6] w-full max-w-2xl rounded-[2rem] shadow-luxury overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-10 py-8 border-b border-[#e8e2da]">
          <h2 className="text-3xl font-serif text-[#1b1c1a]">
            Modify Base Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#7a6e63] hover:text-[#1b1c1a] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar"
        >

          <InputField
            id="title"
            label="Collection Title"
            error={errors.title?.message}
            {...register("title")}
          />

          <TextAreaField
            id="description"
            label="Archive Description"
            error={errors.description?.message}
            {...register("description")}
          />

          <SelectField
            id="category"
            label="Categorization"
            options={categories}
            value={categoryValue}
            onChange={(val) => setValue("category", val)}
            error={errors.category?.message}
          />

          <div className="pt-4 flex justify-end gap-6">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#7a6e63] hover:text-[#1b1c1a] transition-colors"
            >
              Cancel
            </button>
            <SubmitButton isLoading={isSubmitting}>
              Apply Revisions
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;

