import React, { useCallback, useState } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { FormLabel, ErrorMessage } from "./FormElements";

export const ImageUploadZone = ({ images, onChange, error, maxImages = 7 }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
      if (files && files.length > 0) {
        addImages(files);
      }
    },
    [images, maxImages]
  );

  const handleChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files || []).filter((file) => file.type.startsWith("image/"));
    if (files && files.length > 0) {
      addImages(files);
    }
    e.target.value = null;
  };

  const addImages = (newFiles) => {
    const slotsAvailable = maxImages - images.length;
    const filesToAdd = newFiles.slice(0, slotsAvailable);

    if (filesToAdd.length === 0) return;

    const mappedFiles = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
    }));

    onChange([...images, ...mappedFiles]);
  };

  const removeImage = (idToRemove) => {
    const imgToRemove = images.find(img => img.id === idToRemove);
    if (imgToRemove) {
      URL.revokeObjectURL(imgToRemove.preview);
    }
    onChange(images.filter((img) => img.id !== idToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <FormLabel htmlFor="image-upload" required className="mb-0">Product Gallery</FormLabel>
        <span className={`text-[10px] font-bold tracking-widest ${images.length === maxImages ? "text-gold" : "text-charcoal/30"}`}>
          {images.length} / {maxImages}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Upload Trigger / Main Drop Zone */}
        {images.length < maxImages && (
          <label
            htmlFor="image-upload"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative aspect-[4/5] sm:aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-500 cursor-pointer group hover:bg-gold/5 ${
              isDragActive 
              ? "border-gold bg-gold/5 scale-[0.98] shadow-luxury" 
              : error 
              ? "border-red-200" 
              : "border-charcoal/5 hover:border-gold hover:shadow-luxury"
            }`}
          >
            <div className="flex flex-col items-center justify-center p-6 text-center">
               <div className="w-10 h-10 rounded-full bg-cream-dark/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <UploadCloud className={`w-5 h-5 ${isDragActive ? "text-gold" : "text-charcoal/20 group-hover:text-gold"} transition-colors`} />
               </div>
               <p className="text-[9px] font-bold tracking-[0.1em] text-charcoal/40 group-hover:text-charcoal transition-colors">
                 ADD <br /> IMAGES
               </p>
            </div>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        )}

        {/* Preview Grid */}
        {images.map((img, idx) => (
          <div 
            key={img.id} 
            className={`relative group aspect-[4/5] sm:aspect-square bg-cream-dark/30 rounded-2xl overflow-hidden shadow-luxury border border-charcoal/5 transition-all duration-500 hover:scale-[1.02] ${idx === 0 ? " ring-2 ring-gold ring-offset-2 ring-offset-white ring-inset" : ""}`}
          >
            <img 
              src={img.preview} 
              alt={`Preview ${idx + 1}`} 
              className="w-full h-full object-cover transition-all duration-700 brightness-[1.02] group-hover:scale-110" 
            />
            
            {/* Overlay for actions */}
            <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="bg-white/90 hover:bg-white text-red-500 p-2.5 rounded-full shadow-luxury hover:scale-110 active:scale-95 transition-all duration-300"
                title="Remove image"
                >
                <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Badge for Cover Image */}
            {idx === 0 && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gold text-white text-[7px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full shadow-luxury">
                  Cover
                </span>
              </div>
            )}
            
            {/* Number indicator */}
            <div className="absolute bottom-3 right-3 bg-white/40 backdrop-blur-md border border-white/20 text-charcoal text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {idx + 1}
            </div>
          </div>
        ))}

        {/* Skeleton Placeholders */}
        {Array.from({ length: Math.max(0, 5 - images.length - (images.length < maxImages ? 1 : 0)) }).map((_, idx) => (
          <div key={`skeleton-${idx}`} className="hidden sm:flex aspect-square rounded-2xl border border-charcoal/5 bg-cream/30 items-center justify-center opacity-30">
             <ImageIcon className="w-5 h-5 text-charcoal" />
          </div>
        ))}
      </div>

      <ErrorMessage message={error?.message || error} />
    </div>
  );
};
