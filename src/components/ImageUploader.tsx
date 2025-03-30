import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SocialMediaBadge, { SocialMediaPlatform } from './SocialMediaBadge';

const SOCIAL_MEDIA_PLATFORMS: SocialMediaPlatform[] = ["facebook", "instagram", "twitter"];

interface ImageUploaderProps {
  onImageUpload: (file: File, platforms: SocialMediaPlatform[]) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialMediaPlatform[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageUpload(file, selectedPlatforms);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const togglePlatform = (platform: SocialMediaPlatform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        !previewUrl && 'border-2 border-dashed rounded-lg transition-all duration-200 ease-in-out',
        !previewUrl && 'flex flex-col items-center justify-center py-12 px-6',
        !previewUrl && 'bg-secondary/50',
        isDragging && !previewUrl
          ? 'border-primary bg-primary/5'
          : !previewUrl && 'border-border hover:border-primary/50',
        className
      )}
      >
        {!previewUrl ? (
          <div
            className="w-full flex flex-col items-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="animate-float">
              <UploadCloud
                className="w-12 h-12 mb-4 text-primary/80"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">Drag & drop marketing image</h3>
            <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
              Upload your marketing post image to get AI-powered recommendations for improvements
            </p>

            <Button
              variant="outline"
              className="mt-2 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Select Image
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden animate-fade-in shadow-elevated">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-[400px] object-contain rounded-lg"
            />
            <div className="absolute top-3 right-3">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full w-8 h-8 bg-background/80 backdrop-blur-sm border shadow-sm"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t w-full">
        <p className="text-sm font-medium mb-3 text-center">Select target platforms for better analysis</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {
            SOCIAL_MEDIA_PLATFORMS.map((platform) => (
              <SocialMediaBadge
                key={platform}
                platform={platform}
                isSelected={selectedPlatforms.includes(platform)}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlatform(platform);
                }}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
