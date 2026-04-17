import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidationSchema } from "../validation/product.validation";
import {
  FormWrapper,
  SectionCard,
  InputField,
  TextAreaField,
  SelectField,
  SubmitButton,
} from "../components/FormElements";
import { ImageUploadZone } from "../components/ImageUploadZone";
import useProduct from "../hooks/useProduct";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      currency: "INR",
      images: [],
    },
  });


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMsg("");
    try {
      // Data preparation: Currently passing internal objects, in a real app you might use FormData 
      // if endpoints expect standard multipart/form-data for image uploads.
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("priceAmount", data.price);
      formData.append("priceCurrency", data.currency);
      data.images.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });

      // Pass the formData to the API service wrapper
      const res = await handleCreateProduct(formData);
      console.log(res)
      
      // Cleanup Object URLs to avoid memory leaks
      data.images.forEach((img) => URL.revokeObjectURL(img.preview));
      
      setSuccessMsg("Product created successfully!");



      reset(); // Reset form state
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 md:px-8 lg:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-6">
            <span className="text-3xl font-black tracking-widest text-yellow-500 uppercase">SNITCH</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-zinc-100 uppercase mb-4">
            Create <span className="text-yellow-500">Product</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-wide">
            Add a new item to your premium collection.
          </p>
        </div>

        {successMsg && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500 text-green-500 text-center font-bold tracking-wide">
            {successMsg}
          </div>
        )}

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {/* General info section */}
          <SectionCard 
            title="General Information" 
            description="Essential details that define your product."
          >
            <InputField
              id="title"
              label="Product Title"
              placeholder="e.g. Oversized Drop Shoulder Tee"
              required
              {...register("title")}
              error={errors.title?.message}
            />

            <TextAreaField
              id="description"
              label="Description"
              placeholder="Detail the fabric, fit, and style..."
              required
              {...register("description")}
              error={errors.description?.message}
            />
          </SectionCard>

          {/* Pricing section */}
          <SectionCard 
            title="Pricing" 
            description="Set the value for your item."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="price"
                type="number"
                step="0.01"
                min="0"
                label="Price"
                placeholder="0.00"
                required
                {...register("price")}
                error={errors.price?.message}
              />

              <SelectField
                id="currency"
                label="Currency"
                required
                options={[
                  { value: "INR", label: "INR (₹)" },
                  { value: "USD", label: "USD ($)" },
                  { value: "EUR", label: "EUR (€)" },
                  { value: "GBP", label: "GBP (£)" },
                ]}
                {...register("currency")}
                error={errors.currency?.message}
              />
            </div>
          </SectionCard>

          {/* Media section */}
          <SectionCard 
            title="Media" 
            description="High-quality images sell the product. First image becomes the cover."
          >
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUploadZone
                  images={value}
                  onChange={onChange}
                  error={errors.images}
                  maxImages={7}
                />
              )}
            />
          </SectionCard>

          <div className="flex justify-end pt-4 pb-12">
            <SubmitButton isLoading={isSubmitting}>
              Publish Product
            </SubmitButton>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default CreateProduct;