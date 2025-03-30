
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import ImageUploader from '@/components/ImageUploader';
import ImageAnalysis from '@/components/ImageAnalysis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalysisResult } from '@/types/analysis';
import { Recommendation } from '@/components/RecommendationCard';
import { ArrowRight, Lock, Sparkles, MessageSquare } from 'lucide-react';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

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

  const convertToRecommendations = (result: AnalysisResult): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Add positives
    result.positives.forEach((text, index) => {
      recommendations.push({
        id: `positive-${index}`,
        type: 'positive',
        title: 'Effective Element',
        description: text
      });
    });
    
    // Add improvements
    result.improvements.forEach((text, index) => {
      recommendations.push({
        id: `improvement-${index}`,
        type: 'improvement',
        title: 'Area to Improve',
        description: text
      });
    });
    
    // Add suggestions
    result.suggestions.forEach((text, index) => {
      recommendations.push({
        id: `suggestion-${index}`,
        type: 'suggestion',
        title: 'Recommendation',
        description: text
      });
    });
    
    return recommendations;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <Navigation />
      
      <header className="container py-8 md:py-12 mt-16">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
            <Sparkles className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Marketing Image Analyzer
          </h1>
          <p className="text-muted-foreground max-w-[42rem] text-balance">
            Upload your marketing images and get AI-powered recommendations to improve their effectiveness
          </p>
        </div>
      </header>

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
            
            <TabsContent value="upload" className="space-y-6 animate-fade-in">
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
            </TabsContent>
            
            <TabsContent value="apikey" className="space-y-6 animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2 mt-6">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Add Context (Optional)</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your marketing goals, target audience, or specific aspects you want feedback on.
                      </p>
                      <Textarea
                        placeholder="E.g., This is a Facebook ad for our new product targeting young professionals..."
                        value={promptText}
                        onChange={handlePromptChange}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('upload')}
                >
                  Back
                </Button>
                
                <Button 
                  onClick={handleAnalyzeImage}
                  disabled={!uploadedImage || isAnalyzing}
                  className="px-6"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-8 animate-fade-in">
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
                
                <Button 
                  onClick={() => {
                    setUploadedImage(null);
                    setRecommendations(null);
                    setPromptText('');
                    setSelectedPlatforms([]);
                    setActiveTab('upload');
                  }}
                >
                  Analyze Another Image
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="container py-6 md:py-8">
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Created with AI-powered image analysis technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
