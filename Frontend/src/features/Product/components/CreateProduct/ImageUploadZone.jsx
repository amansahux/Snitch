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
    // reset input so the same file could be selected again if removed
    e.target.value = null;
  };

  const addImages = (newFiles) => {
    // Determine how many slots are left
    const slotsAvailable = maxImages - images.length;
    const filesToAdd = newFiles.slice(0, slotsAvailable);

    if (filesToAdd.length === 0) return;

    // Create standard structure with preview
    const mappedFiles = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Warning: Memory can leak if not revoked in complex apps, ok for this scale
      id: Math.random().toString(36).substring(7),
    }));

    onChange([...images, ...mappedFiles]);
  };

  const removeImage = (idToRemove) => {
    onChange(images.filter((img) => img.id !== idToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <FormLabel htmlFor="image-upload" required>Product Images</FormLabel>
        <span className={`text-xs font-medium tracking-wide ${images.length === maxImages ? "text-yellow-500" : "text-zinc-500"}`}>
          {images.length} / {maxImages} Uploaded
        </span>
      </div>

      {images.length < maxImages && (
        <label
          htmlFor="image-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${
            isDragActive ? "border-yellow-500 bg-yellow-500/5" : error ? "border-red-500" : "border-zinc-700 hover:border-yellow-500 hover:bg-zinc-900"
          } transition-all duration-300 cursor-pointer group mb-1`}
        >
          <div className="flex flex-col items-center justify-center pt-4 pb-4">
            <UploadCloud className={`w-8 h-8 mb-2 ${isDragActive ? "text-yellow-500" : "text-zinc-400 group-hover:text-yellow-500"} transition-colors`} />
            <p className="mb-1 text-sm text-zinc-300">
              <span className="font-semibold text-yellow-500">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">PNG, JPG or JPEG</p>
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

      {error && <div className="mt-1"><ErrorMessage message={error.message || error} /></div>}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
          {images.map((img, idx) => (
            <div key={img.id} className="relative group aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
              <img src={img.preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
              {/* Optional Index Badge */}
              <div className="absolute top-1 left-1 bg-black/70 text-yellow-500 text-[10px] px-1.5 py-0.5 font-bold border border-yellow-500/50 backdrop-blur-sm">
                {idx + 1}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-none p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:opacity-100 shadow-lg"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {/* Fill empty slots with placeholders to maintain grid shape */}
          {Array.from({ length: maxImages - images.length }).map((_, idx) => (
            <div key={`empty-${idx}`} className="hidden sm:flex aspect-square border border-dashed border-zinc-800 items-center justify-center opacity-30">
               <ImageIcon className="w-5 h-5 text-zinc-700" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
