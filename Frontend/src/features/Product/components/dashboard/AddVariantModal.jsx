import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus, Trash2 } from "lucide-react";
import { 
  InputField, 
  SubmitButton 
} from "../CreateProduct/FormElements";
import { ImageUploadZone } from "../CreateProduct/ImageUploadZone";

const addVariantSchema = z.object({
  price: z.object({
    amount: z.preprocess((val) => Number(val), z.number().min(1, "Price must be greater than 0")),
  }),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Stock cannot be negative")),
  attributes: z.array(z.object({
    key: z.string().min(1, "Attribute key is required"),
    value: z.string().min(1, "Attribute value is required"),
  })).min(1, "At least one attribute (e.g., Size, Color) is required"),
});

const AddVariantModal = ({ isOpen, onClose, onAdd }) => {
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(addVariantSchema),
    defaultValues: {
      price: { amount: 0 },
      stock: 0,
      attributes: [{ key: "Size", value: "" }],
    },
  });

  const attributes = watch("attributes");
  
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

  const addAttribute = () => {
    setValue("attributes", [...attributes, { key: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    if (attributes.length > 1) {
      setValue("attributes", attributes.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Transform attributes array to object
    const attrObject = {};
    data.attributes.forEach(attr => {
      attrObject[attr.key] = attr.value;
    });

    formData.append("stock", data.stock);
    formData.append("priceAmount", data.price.amount);
    formData.append("attributes", JSON.stringify(attrObject));

    // Append images
    images.forEach((img) => {
      formData.append("images", img.file);
    });
    
    await onAdd(formData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div className="absolute inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />
      
      <div className="relative bg-[#fbf9f6] w-full max-w-3xl rounded-[3rem] shadow-luxury overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-10 py-10 border-b border-[#e8e2da]">
          <div>
            <h2 className="text-3xl font-serif text-[#1b1c1a]">Archive New Variation</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#7a6e63] mt-2">Specify unique attributes, pricing and inventory</p>
          </div>
          <button onClick={handleClose} className="p-3 bg-white rounded-full text-[#7a6e63] hover:text-[#1b1c1a] transition-all border border-[#e8e2da]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-10 max-h-[70vh] overflow-y-auto no-scrollbar">
          {/* Image Selection Section */}
          <section className="bg-white p-8 rounded-3xl border border-[#e8e2da]/40 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a]">Variant Gallery (Max 7)</h3>
            <ImageUploadZone 
              images={images} 
              onChange={setImages} 
              maxImages={7}
            />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              id="price"
              label="Variation Price (₹)"
              type="number"
              error={errors.price?.amount?.message}
              {...register("price.amount")}
            />
            <InputField
              id="stock"
              label="Stock Level"
              type="number"
              error={errors.stock?.message}
              {...register("stock")}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a]">Attributes (Size, Fabric, etc.)</h3>
              <button 
                type="button"
                onClick={addAttribute}
                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#C9A96E] hover:text-[#1b1c1a] transition-colors"
              >
                <Plus size={12} /> Add Attribute
              </button>
            </div>

            <div className="space-y-4">
              {attributes.map((attr, index) => (
                <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex-1">
                    <InputField
                      placeholder="e.g. Size"
                      error={errors.attributes?.[index]?.key?.message}
                      {...register(`attributes.${index}.key`)}
                    />
                  </div>
                  <div className="flex-1">
                    <InputField
                      placeholder="e.g. XL"
                      error={errors.attributes?.[index]?.value?.message}
                      {...register(`attributes.${index}.value`)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttribute(index)}
                    className="mb-4 p-3 text-[#7a6e63] hover:text-red-500 transition-colors"
                    disabled={attributes.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {errors.attributes?.message && (
                <p className="text-red-500 text-[10px] italic">{errors.attributes.message}</p>
              )}
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-6 border-t border-[#e8e2da]/40">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#7a6e63] hover:text-[#1b1c1a] transition-colors"
            >
              Discard
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

