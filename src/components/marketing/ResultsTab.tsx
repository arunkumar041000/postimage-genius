
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageAnalysis from '@/components/ImageAnalysis';
import { Recommendation } from '@/components/RecommendationCard';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';

interface ResultsTabProps {
  setActiveTab: (tab: string) => void;
  uploadedImage: File | null;
  recommendations: Recommendation[] | null;
  isAnalyzing: boolean;
  error: string | null;
  selectedPlatforms: SocialMediaPlatform[];
  promptText: string;
  resetAnalysis: () => void;
}

const ResultsTab = ({ 
  setActiveTab, 
  uploadedImage, 
  recommendations, 
  isAnalyzing, 
  error, 
  selectedPlatforms, 
  promptText,
  resetAnalysis 
}: ResultsTabProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {uploadedImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Image</h3>
            <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
              <img 
                src={URL.createObjectURL(uploadedImage)} 
                alt="Uploaded marketing image" 
                className="w-full h-auto max-h-[350px] object-contain"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPlatforms.map(platform => (
                <Badge key={platform} variant="secondary" className="text-xs">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Badge>
              ))}
            </div>
            
            {promptText && (
              <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                <p className="font-medium mb-1">Your context:</p>
                <p>{promptText}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Analysis Results</h3>
            <div className="shadow-md">
              <ImageAnalysis 
                recommendations={recommendations}
                isLoading={isAnalyzing}
                error={error}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setActiveTab('apikey')}
        >
          Back
        </Button>
        
        <Button onClick={resetAnalysis}>
          Analyze Another Image
        </Button>
      </div>
    </div>
  );
};

export default ResultsTab;
