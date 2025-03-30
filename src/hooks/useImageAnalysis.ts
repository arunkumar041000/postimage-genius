
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AnalysisResult } from '@/types/analysis';
import { Recommendation } from '@/components/RecommendationCard';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';
import { convertToRecommendations } from '@/utils/analysisUtils';

export function useImageAnalysis() {
  const { currentUser } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [promptText, setPromptText] = useState<string>('');
  const [imagePublicUrl, setImagePublicUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File, platforms: SocialMediaPlatform[]) => {
    setUploadedImage(file);
    setPlatforms(platforms);
    setError(null);
    setRecommendations(null);
    setImagePublicUrl(null);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  const handleAnalyzeImage = async (currentHistoryItemId: string | undefined, fetchAnalysisHistory: () => Promise<void>, setCurrentHistoryItemId: (id: string | undefined) => void, setActiveTab: (tab: string) => void) => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    if (!currentUser) {
      toast.error('Please log in to analyze images');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      /*
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
      */
      // Upload image to Supabase Storage
      const fileName = `${Date.now()}_${uploadedImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('analysis_images')
        .upload(fileName, uploadedImage);

      
      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }
      
      // Get the public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('analysis_images')
        .getPublicUrl(fileName);
      
      const imageUrl = urlData.publicUrl;
      setImagePublicUrl(imageUrl);
      
      // Call the Supabase Edge Function for analysis
      const { data: analysisData, error: analysisError } = await supabase.functions
        .invoke('analyze-image', {
          body: {
            imageUrl: imageUrl,
            prompt: promptText || null,
            platforms: platforms.length > 0 ? platforms : null
          }
        });
      
      if (analysisError) {
        throw new Error(`Analysis failed: ${analysisError.message}`);
      }
      
      // Convert to recommendations format
      const result = analysisData as AnalysisResult;
      const newRecommendations = convertToRecommendations(result);
      setRecommendations(newRecommendations);
      
      // Save analysis to Supabase
      const { data: historyData, error: historyError } = await supabase
        .from('analysis_history')
        .insert({
          user_id: currentUser.id,
          image_url: imageUrl,
          prompt: promptText || null,
          result: result
        })
        .select();
      
      if (historyError) {
        console.error('Error saving analysis history:', historyError);
        toast.error('Analysis completed but history could not be saved');
      } else if (historyData && historyData.length > 0) {
        setCurrentHistoryItemId(historyData[0].id);
        // Refresh history
        fetchAnalysisHistory();
        toast.success('Analysis complete and saved!');
      }
      
      // Switch to results tab
      setActiveTab('results');
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
    setImagePublicUrl(null);
  };

  return {
    uploadedImage,
    platforms,
    isAnalyzing,
    error,
    recommendations,
    promptText,
    imagePublicUrl,
    handleImageUpload,
    handlePromptChange,
    handleAnalyzeImage,
    resetAnalysis,
    setPromptText,
    setRecommendations,
    setUploadedImage
  };
}
