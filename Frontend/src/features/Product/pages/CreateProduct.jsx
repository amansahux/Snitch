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
} from "../components/CreateProduct/FormElements";
import { ImageUploadZone } from "../components/CreateProduct/ImageUploadZone";
import useProduct from "../hooks/useProduct";
import { toast } from "react-hot-toast";
import { ArrowRight, Sparkles, SquareArrowRightExit } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

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
    const loadingToast = toast.loading("Publishing to collection...");
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("priceAmount", data.price);
      formData.append("priceCurrency", data.currency);
      data.images.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });

      const res = await handleCreateProduct(formData);
      data.images.forEach((img) => URL.revokeObjectURL(img.preview));
      toast.success("Product published successfully!", { id: loadingToast });
      reset();
      navigate("/seller/dashboard")
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to publish product.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans pb-12 relative overflow-x-hidden no-scrollbar">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

      {/* Navigation / Header Branding */}
      <nav className="px-6 lg:px-12 py-8 flex justify-between items-center relative z-20">
        <Link to="/" className="text-2xl font-serif font-bold tracking-[0.3em] text-charcoal flex items-center gap-1.5 transition-opacity hover:opacity-70">
          SNICH<span className="text-gold">.</span>
        </Link>
        <div className="hidden lg:flex items-center gap-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A96E]">Admin Dashboard</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-4 lg:pt-12 pb-8">

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center cursor-pointer gap-3 text-charcoal/40 hover:text-gold transition-all duration-500 mb-10 animate-in fade-in slide-in-from-left-4 duration-700"
        >
          <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
            <SquareArrowRightExit size={18} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] leading-none mb-1">Return</span>
            <span className="text-[10px] font-serif italic text-charcoal/30 group-hover:text-charcoal transition-colors">to Dashboard</span>
          </div>
        </button>
        {/* Editorial Header Section */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="w-8 h-[1px] bg-gold"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold">Product Studio</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-serif text-charcoal leading-tight animate-in fade-in slide-in-from-left-6 duration-1000 delay-100">
            Create Product <span className="italic font-light text-gold">Brief</span>
          </h1>
          
          <p className="max-w-lg text-charcoal-light text-md font-light leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
            Translate your creative vision into a digital offering.
          </p>
        </header>

        <FormWrapper onSubmit={handleSubmit(onSubmit)} className="space-y-8 lg:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-12 xl:col-span-8 space-y-8 lg:space-y-10">
              {/* General Information Card */}
              <SectionCard 
                title="Narrative" 
                description="The identity and craftsmanship summary."
                className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300"
              >
                <div className="space-y-6">
                    <InputField
                    id="title"
                    label="Identity"
                    placeholder="e.g. Signature Oversized Silk Blend Shirt"
                    required
                    {...register("title")}
                    error={errors.title?.message}
                    />

                    <TextAreaField
                    id="description"
                    label="Story"
                    placeholder="Narrative of the process and fit..."
                    required
                    {...register("description")}
                    error={errors.description?.message}
                    />
                </div>
              </SectionCard>

              {/* Media Section Card */}
              <SectionCard 
                title="Visuals" 
                description="Capturing the essence in high fidelity."
                className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400"
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
            </div>

            {/* Price sidebar */}
            <div className="lg:col-span-12 xl:col-span-4 space-y-8 h-fit xl:sticky xl:top-12">
                 <SectionCard 
                    title="Value" 
                    description="Pricing & currency for global release."
                    className="bg-cream-dark/10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500"
                >
                    <div className="space-y-6">
                        <InputField
                            id="price"
                            type="number"
                            step="0.01"
                            label="Retail Price"
                            placeholder="0.00"
                            required
                            {...register("price")}
                            error={errors.price?.message}
                        />

                        <Controller
                            name="currency"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <SelectField
                                    id="currency"
                                    label="Currency"
                                    required
                                    options={[
                                        { value: "INR", label: "INR (₹) - Indian Rupee" },
                                        { value: "USD", label: "USD ($) - US Dollar" },
                                        { value: "EUR", label: "EUR (€) - Euro" },
                                        { value: "GBP", label: "GBP (£) - British Pound" },
                                    ]}
                                    value={value}
                                    onChange={onChange}
                                    error={errors.currency?.message}
                                />
                            )}
                        />

                        <div className="pt-4 border-t border-charcoal/5">
                            <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-charcoal-light uppercase">
                                <span>Status</span>
                                <span className="text-gold flex items-center gap-1.5 animate-pulse">
                                    <Sparkles className="w-3 h-3" />
                                    Active Studio
                                </span>
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* Desktop Sidebar Publish */}
                <div className="hidden xl:block pt-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
                    <SubmitButton isLoading={isSubmitting} className="w-full">
                        Publish Product
                    </SubmitButton>
                </div>
            </div>
          </div>

          {/* Bottom Action for Non-XL Desktop */}
          <div className="xl:hidden flex justify-end pt-4 animate-in fade-in duration-700 delay-700">
            <SubmitButton isLoading={isSubmitting} className="w-full max-w-xs shadow-luxury">
              Publish Product
            </SubmitButton>
          </div>
        </FormWrapper>
      </div>

      {/* Sticky Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-charcoal/5 z-50 flex items-center gap-4 animate-in slide-in-from-bottom-full duration-1000 delay-700 no-scrollbar">
          <div className="flex-1 pl-2">
             <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest leading-none">Studio</p>
             <p className="text-xs font-serif italic text-charcoal leading-tight">Finalizing...</p>
          </div>
          <button
            onClick={() => handleSubmit(onSubmit)()}
            disabled={isSubmitting}
            className="flex-1 bg-charcoal text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-[10px] shadow-luxury disabled:opacity-50"
          >
            {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
                <>
                    Publish <ArrowRight className="w-3 h-3" />
                </>
            )}
          </button>
      </div>
    </div>
  );
};

export default CreateProduct;