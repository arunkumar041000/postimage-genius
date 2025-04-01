
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Info } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import ImageUploader from '@/components/ImageUploader';
import ImageAnalysis from '@/components/ImageAnalysis';
import { useAuth } from '@/contexts/AuthContext';
import { AnalysisHistoryItem } from '@/components/AnalyzerSidebar';
import { SocialMediaPlatform } from '@/components/SocialMediaBadge';
import { Recommendation } from '@/components/RecommendationCard';
import { Badge } from '@/components/ui/badge';

interface AnalyzerContentProps {
  uploadedImage: File | null;
  recommendations: Recommendation[] | null;
  isAnalyzing: boolean;
  error: string | null;
  promptText: string;
  platforms: SocialMediaPlatform[];
  handleImageUpload: (file: File, platforms: SocialMediaPlatform[]) => void;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAnalyzeImage: () => void;
  resetAnalysis: () => void;
  remainingAnalyses?: number;
  activeTab:string;
  setActiveTab: (tab:string) => void;
}

const AnalyzerContent: React.FC<AnalyzerContentProps> = ({
  uploadedImage,
  recommendations,
  isAnalyzing,
  error,
  promptText,
  platforms,
  handleImageUpload,
  handlePromptChange,
  handleAnalyzeImage,
  resetAnalysis,
  remainingAnalyses = 5,
  activeTab, setActiveTab
}) => {
  const { currentUser } = useAuth();

  return (
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
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Upload Marketing Image</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Badge variant={remainingAnalyses > 0 ? "outline" : "destructive"} className="flex gap-1 items-center">
                            <Info className="h-3.5 w-3.5" />
                            {remainingAnalyses} / 5 analyses remaining today
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You can analyze up to 5 images per day</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
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
                disabled={!uploadedImage || isAnalyzing || !currentUser || remainingAnalyses <= 0}
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
            
            {currentUser && remainingAnalyses <= 0 && (
              <div className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                You've reached your daily limit of 5 image analyses. Please try again tomorrow.
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
                  resetAnalysis();
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
  );
};

export default AnalyzerContent;
