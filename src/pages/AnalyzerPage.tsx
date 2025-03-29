
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import ImageUploader from '@/components/ImageUploader';
import ImageAnalysis from '@/components/ImageAnalysis';
import AnalyzerSidebar, { AnalysisHistoryItem } from '@/components/AnalyzerSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider } from '@/components/ui/sidebar';
import { resizeImageIfNeeded } from '@/lib/imageProcessor';
import { AnalysisResult } from '@/types/analysis';
import { Recommendation } from '@/components/RecommendationCard';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';

// Remove the STORAGE_KEY constant as we no longer need to store the API key
const AnalyzerPage = () => {
  const { currentUser } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [promptText, setPromptText] = useState<string>('');
  const [historyItems, setHistoryItems] = useState<AnalysisHistoryItem[]>([]);
  const [currentHistoryItemId, setCurrentHistoryItemId] = useState<string | undefined>(undefined);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

  // Load history from Supabase when user is authenticated
  useEffect(() => {
    if (currentUser) {
      fetchAnalysisHistory();
    }
  }, [currentUser]);

  const fetchAnalysisHistory = async () => {
    if (!currentUser) return;
    
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching history:', error);
        toast.error('Failed to load analysis history');
      } else if (data) {
        const historyItems: AnalysisHistoryItem[] = data.map(item => ({
          id: item.id,
          imageUrl: item.image_url,
          createdAt: item.created_at,
          prompt: item.prompt || undefined
        }));
        setHistoryItems(historyItems);
      }
    } catch (err) {
      console.error('Error in fetchAnalysisHistory:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleImageUpload = (file: File, platforms: SocialMediaPlatform[]) => {
    setUploadedImage(file);
    setPlatforms(platforms);
    setError(null);
    setRecommendations(null);
    // Reset current history item when uploading a new image
    setCurrentHistoryItemId(undefined);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  const handleAnalyzeImage = async () => {
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
      // Upload image to Supabase Storage
      const fileName = `${Date.now()}_${uploadedImage.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('analysis_images')
        .upload(fileName, uploadedImage);

      
      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }
      
      // Get the public URL for the uploaded image
      const imageUrl = supabase.storage
        .from('analysis_images')
        .getPublicUrl(fileName).data.publicUrl;
      
      // Process and resize image if needed for analysis
      const base64Image = await resizeImageIfNeeded(uploadedImage);
      
      // Call the Supabase Edge Function for analysis
      const { data: analysisData, error: analysisError } = await supabase.functions
        .invoke('analyze-image', {
          body: {
            image: base64Image,
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

  const handleSelectHistoryItem = async (item: AnalysisHistoryItem) => {
    setCurrentHistoryItemId(item.id);
    
    try {
      // Fetch the full analysis data
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('id', item.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Create a fake File object from the URL
        const response = await fetch(data.image_url);
        const blob = await response.blob();
        const fileName = data.image_url.split('/').pop() || 'image.jpg';
        const file = new File([blob], fileName, { type: blob.type });
        
        // Set the data in the UI
        setUploadedImage(file);
        setPromptText(data.prompt || '');
        
        // Convert result to recommendations format
        if (data.result) {
          // Cast the result to AnalysisResult with type assertion
          const analysisResult = data.result as unknown as AnalysisResult;
          const newRecommendations = convertToRecommendations(analysisResult);
          setRecommendations(newRecommendations);
        }
        
        // Switch to results tab
        setActiveTab('results');
      }
    } catch (err) {
      console.error('Error loading history item:', err);
      toast.error('Failed to load analysis from history');
    }
  };

  const handleDeleteHistoryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('analysis_history')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // If the deleted item was the current one, reset the UI
      if (id === currentHistoryItemId) {
        setUploadedImage(null);
        setRecommendations(null);
        setPromptText('');
        setCurrentHistoryItemId(undefined);
        setActiveTab('upload');
      }
      
      // Refresh history
      fetchAnalysisHistory();
      toast.success('Analysis deleted');
    } catch (err) {
      console.error('Error deleting history item:', err);
      toast.error('Failed to delete analysis');
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
      
      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-60px)]">
          <AnalyzerSidebar 
            historyItems={historyItems} 
            onSelectItem={handleSelectHistoryItem}
            onDeleteItem={handleDeleteHistoryItem}
            currentItemId={currentHistoryItemId}
          />
          
          <div className="flex-1 flex flex-col">
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
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                    <TabsTrigger value="results" disabled={!recommendations && !isAnalyzing}>
                      Analysis
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-6 animate-fade-in">
                    <Card>
                      <CardContent className="pt-6">
                        <ImageUploader onImageUpload={handleImageUpload} />
                        
                        {uploadedImage && (
                          <div className="space-y-4 mt-6 pt-4 border-t">
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
                        )}
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleAnalyzeImage}
                        disabled={!uploadedImage || isAnalyzing || !currentUser}
                        className="px-6 gap-2"
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Image'} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {!currentUser && (
                      <div className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                        You need to be logged in to save analysis history. <a href="/login" className="underline font-medium">Log in</a> or <a href="/signup" className="underline font-medium">sign up</a>.
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="results" className="space-y-8 animate-fade-in">
                    {uploadedImage && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Your Image</h3>
                          <div className="rounded-lg overflow-hidden border bg-card">
                            <img 
                              src={URL.createObjectURL(uploadedImage)} 
                              alt="Uploaded marketing image" 
                              className="w-full h-auto object-contain"
                            />
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
                          <ImageAnalysis 
                            recommendations={recommendations}
                            isLoading={isAnalyzing}
                            error={error}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('upload')}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        onClick={() => {
                          setUploadedImage(null);
                          setRecommendations(null);
                          setPromptText('');
                          setCurrentHistoryItemId(undefined);
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
          </div>
        </div>
      </SidebarProvider>
      
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

export default AnalyzerPage;
