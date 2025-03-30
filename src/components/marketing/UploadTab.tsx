
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ImageUploader from '@/components/ImageUploader';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';

interface UploadTabProps {
  setActiveTab: (tab: string) => void;
  uploadedImage: File | null;
  handleImageUpload: (file: File, platforms: SocialMediaPlatform[]) => void;
}

const UploadTab = ({ setActiveTab, uploadedImage, handleImageUpload }: UploadTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="pt-6">
          <ImageUploader onImageUpload={handleImageUpload} />
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button 
          onClick={() => setActiveTab('apikey')}
          className="px-6 gap-2"
          disabled={!uploadedImage}
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UploadTab;
