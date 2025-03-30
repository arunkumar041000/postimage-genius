
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import MarketingHeader from '@/components/marketing/MarketingHeader';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import UploadTab from '@/components/marketing/UploadTab';
import PromptTab from '@/components/marketing/PromptTab';
import ResultsTab from '@/components/marketing/ResultsTab';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';
import { AnalysisResult } from '@/types/analysis';
import { Recommendation } from '@/components/RecommendationCard';
import { convertToRecommendations } from '@/utils/analysisUtils';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [promptText, setPromptText] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialMediaPlatform[]>([]);
  const [imagePublicUrl, setImagePublicUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File, platforms: SocialMediaPlatform[]) => {
    setUploadedImage(file);
    setSelectedPlatforms(platforms);
    setError(null);
    setRecommendations(null);
    setImagePublicUrl(null);
    // Switch to prompt tab if image is uploaded and we don't have recommendations yet
    if (!recommendations && activeTab === 'upload') {
      setActiveTab('apikey');
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  const handleAnalyzeImage = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Upload image to Supabase Storage if not already uploaded
      if (!imagePublicUrl) {
        // Create a storage bucket first if it doesn't exist
        const { data: bucketData, error: bucketError } = await supabase
          .storage
          .getBucket('analysis_images');

        if (bucketError && bucketError.message.includes('not found')) {
          await supabase
            .storage
            .createBucket('analysis_images', {
              public: true,
              fileSizeLimit: 5242880 // 5MB
            });
        }

        const fileName = `${Date.now()}_${uploadedImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('analysis_images')
          .upload(fileName, uploadedImage);

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }
        
        // Get the public URL
        const { data } = supabase.storage
          .from('analysis_images')
          .getPublicUrl(fileName);
        
        setImagePublicUrl(data.publicUrl);
      }
      
      // Call the Supabase Edge Function with the image URL
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: {
          imageUrl: imagePublicUrl,
          prompt: promptText,
          platforms: selectedPlatforms
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze image');
      }
      
      if (!data) {
        throw new Error('No analysis data returned');
      }
      
      // Convert to recommendations format
      const result = data as AnalysisResult;
      const newRecommendations = convertToRecommendations(result);
      setRecommendations(newRecommendations);
      
      // Switch to results tab
      setActiveTab('results');
      toast.success('Analysis complete!');

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      toast.error('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setRecommendations(null);
    setPromptText('');
    setSelectedPlatforms([]);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <Navigation />
      
      <MarketingHeader />
      
      <main className="container flex-1">
        <div className="max-w-3xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="apikey">Add Context</TabsTrigger>
              <TabsTrigger value="results" disabled={!recommendations && !isAnalyzing}>
                Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <UploadTab 
                setActiveTab={setActiveTab}
                uploadedImage={uploadedImage}
                handleImageUpload={handleImageUpload}
              />
            </TabsContent>
            
            <TabsContent value="apikey">
              <PromptTab 
                setActiveTab={setActiveTab}
                promptText={promptText}
                handlePromptChange={handlePromptChange}
                handleAnalyzeImage={handleAnalyzeImage}
                uploadedImage={uploadedImage}
                isAnalyzing={isAnalyzing}
              />
            </TabsContent>
            
            <TabsContent value="results">
              <ResultsTab 
                setActiveTab={setActiveTab}
                uploadedImage={uploadedImage}
                recommendations={recommendations}
                isAnalyzing={isAnalyzing}
                error={error}
                selectedPlatforms={selectedPlatforms}
                promptText={promptText}
                resetAnalysis={resetAnalysis}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MarketingFooter />
    </div>
  );
};

export default Index;
