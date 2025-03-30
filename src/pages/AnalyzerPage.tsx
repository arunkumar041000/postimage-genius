
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

import Navigation from '@/components/Navigation';
import AnalyzerSidebar from '@/components/AnalyzerSidebar';
import AnalyzerHeader from '@/components/analyzer/AnalyzerHeader';
import AnalyzerContent from '@/components/analyzer/AnalyzerContent';
import AnalyzerFooter from '@/components/analyzer/AnalyzerFooter';

import { useAuth } from '@/contexts/AuthContext';
import { useAnalysisHistory } from '@/hooks/useAnalysisHistory';
import { useImageAnalysis } from '@/hooks/useImageAnalysis';

const AnalyzerPage = () => {
  const { currentUser } = useAuth();
  
  // Use custom hooks to manage state and logic
  const { 
    historyItems, 
    currentHistoryItemId, 
    setCurrentHistoryItemId, 
    fetchAnalysisHistory,
    handleSelectHistoryItem, 
    handleDeleteHistoryItem 
  } = useAnalysisHistory();

  const {
    uploadedImage,
    platforms,
    isAnalyzing,
    error,
    recommendations,
    promptText,
    handleImageUpload,
    handlePromptChange,
    handleAnalyzeImage: analyzeImage,
    resetAnalysis: reset,
    setPromptText,
    setRecommendations,
    setUploadedImage
  } = useImageAnalysis();

  // Handle state for tabs
  const [activeTab, setActiveTab] = React.useState<string>('upload');

  // Function to handle selecting a history item
  const onSelectHistoryItem = async (item: any) => {
    const data = await handleSelectHistoryItem(item);
    
    if (data) {
      // Create a fake File object from the URL
      try {
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
          const analysisResult = data.result as any;
          const newRecommendations = convertToRecommendations(analysisResult);
          setRecommendations(newRecommendations);
        }
        
        // Switch to results tab
        setActiveTab('results');
      } catch (err) {
        console.error('Error creating File from URL:', err);
      }
    }
  };

  // Function to handle analyzing an image
  const handleAnalyzeImage = () => {
    analyzeImage(currentHistoryItemId, fetchAnalysisHistory, setCurrentHistoryItemId, setActiveTab);
  };

  // Function to reset analysis state
  const resetAnalysis = () => {
    reset();
    setCurrentHistoryItemId(undefined);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <Navigation />
      
      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-60px)]">
          <AnalyzerSidebar 
            historyItems={historyItems} 
            onSelectItem={onSelectHistoryItem}
            onDeleteItem={handleDeleteHistoryItem}
            currentItemId={currentHistoryItemId}
          />
          
          <div className="flex-1 flex flex-col">
            <AnalyzerHeader />

            <AnalyzerContent 
              uploadedImage={uploadedImage}
              recommendations={recommendations}
              isAnalyzing={isAnalyzing}
              error={error}
              promptText={promptText}
              platforms={platforms}
              handleImageUpload={handleImageUpload}
              handlePromptChange={handlePromptChange}
              handleAnalyzeImage={handleAnalyzeImage}
              resetAnalysis={resetAnalysis}
              currentUser={currentUser}
            />
          </div>
        </div>
      </SidebarProvider>
      
      <AnalyzerFooter />
    </div>
  );
};

// Helper function imported from utils
const convertToRecommendations = (result: any): any[] => {
  const recommendations: any[] = [];
  
  // Add positives
  result.positives.forEach((text: string, index: number) => {
    recommendations.push({
      id: `positive-${index}`,
      type: 'positive',
      title: 'Effective Element',
      description: text
    });
  });
  
  // Add improvements
  result.improvements.forEach((text: string, index: number) => {
    recommendations.push({
      id: `improvement-${index}`,
      type: 'improvement',
      title: 'Area to Improve',
      description: text
    });
  });
  
  // Add suggestions
  result.suggestions.forEach((text: string, index: number) => {
    recommendations.push({
      id: `suggestion-${index}`,
      type: 'suggestion',
      title: 'Recommendation',
      description: text
    });
  });
  
  return recommendations;
};

export default AnalyzerPage;
