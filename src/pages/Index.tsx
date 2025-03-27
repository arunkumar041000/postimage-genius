
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ImageUploader from '@/components/ImageUploader';
import ImageAnalysis from '@/components/ImageAnalysis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resizeImageIfNeeded } from '@/lib/imageProcessor';
import { analyzeMarketingImage, AnalysisResult } from '@/lib/openai';
import { Recommendation } from '@/components/RecommendationCard';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'marketing_analyzer_api_key';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem(STORAGE_KEY);
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setError(null);
    setRecommendations(null);
    // Switch to API key tab if image is uploaded and we don't have recommendations yet
    if (!recommendations && activeTab === 'upload') {
      setActiveTab('apikey');
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    // Save to localStorage whenever it changes
    localStorage.setItem(STORAGE_KEY, newApiKey);
  };

  const handleAnalyzeImage = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    if (!apiKey || apiKey.trim() === '') {
      toast.error('Please enter your OpenAI API key');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Process and resize image if needed
      const base64Image = await resizeImageIfNeeded(uploadedImage);
      
      // Analyze with OpenAI
      const result = await analyzeMarketingImage(base64Image, apiKey);
      
      // Convert to recommendations format
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
      <header className="container py-8 md:py-12">
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
              <TabsTrigger value="apikey">API Key</TabsTrigger>
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
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Your OpenAI API Key</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enter your OpenAI API key to analyze the image. Your key is securely stored in your browser and never sent to our servers.
                      </p>
                    </div>
                    
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={handleApiKeyChange}
                      className="font-mono"
                    />
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Don't have an API key? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get one from OpenAI</a></p>
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
                  disabled={!uploadedImage || !apiKey || isAnalyzing}
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
                    <div className="rounded-lg overflow-hidden border bg-card">
                      <img 
                        src={URL.createObjectURL(uploadedImage)} 
                        alt="Uploaded marketing image" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
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
                  onClick={() => setActiveTab('apikey')}
                >
                  Back
                </Button>
                
                <Button 
                  onClick={() => {
                    setUploadedImage(null);
                    setRecommendations(null);
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
