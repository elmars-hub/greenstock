import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { XIcon, Upload, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  if (value) {
    return (
      <div className="relative group">
        <div className="relative size-32 rounded-lg overflow-hidden border-2 border-border hover:border-border/60 transition-colors">
          <img
            src={value}
            alt="Upload"
            className="w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <button
              onClick={() => onChange("")}
              className="opacity-0 group-hover:opacity-100 bg-destructive hover:bg-destructive/90 text-destructive-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              type="button"
              title="Remove image"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80">
      <UploadDropzone<OurFileRouter, "postImage">
        endpoint={endpoint}
        onUploadBegin={() => {
          setIsUploading(true);
        }}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          console.log("Files: ", res);
          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          console.error("Upload error:", error);
          alert(`Upload failed: ${error.message}`);
        }}
        className={`
          ut-uploading:opacity-50
          ut-label:text-base
          ut-label:text-foreground
          ut-label:font-medium
          ut-button:bg-primary
          ut-button:ut-readying:bg-primary/80
          ut-button:ut-uploading:bg-primary/50
          ut-button:ut-uploading:cursor-not-allowed
          ut-button:rounded-md
          ut-button:px-3
          ut-button:py-1.5
          ut-button:text-primary-foreground
          ut-button:font-medium
          ut-button:transition-all
          ut-button:hover:bg-primary/90
          ut-button:disabled:opacity-50
          ut-button:disabled:cursor-not-allowed
          ut-allowed-content:text-muted-foreground
          ut-allowed-content:text-xs
          ut-allowed-content:mt-1
          border-2
          border-dashed
          border-border
          rounded-lg
          p-6
          text-center
          hover:border-border/60
          transition-colors
          bg-muted/30
          hover:bg-muted/50
          ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}
        `}
        content={{
          allowedContent: "Images up to 4MB",
          button: isUploading ? "Uploading..." : "Choose Image",
          label: isUploading ? "Uploading your image..." : "Drop your image here or click to browse",
        }}
        appearance={{
          allowedContent: "text-muted-foreground text-xs mt-1",
          button: "bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-3 py-1.5 rounded-md transition-all",
          label: "text-base text-foreground font-medium",
        }}
      />
    </div>
  );
}

export default ImageUpload;