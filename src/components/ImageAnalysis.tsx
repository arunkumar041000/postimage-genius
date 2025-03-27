
import React from 'react';
import { cn } from '@/lib/utils';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import LoadingSpinner from './LoadingSpinner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ImageAnalysisProps {
  recommendations: Recommendation[] | null;
  isLoading: boolean;
  error: string | null;
  className?: string;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({
  recommendations,
  isLoading,
  error,
  className,
}) => {
  // Group recommendations by type for better organization
  const groupedRecommendations = recommendations
    ? {
        positive: recommendations.filter(r => r.type === 'positive'),
        improvement: recommendations.filter(r => r.type === 'improvement'),
        suggestion: recommendations.filter(r => r.type === 'suggestion')
      }
    : null;

  if (isLoading) {
    return (
      <div className={cn('py-16 flex flex-col items-center justify-center gap-4', className)}>
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground animate-pulse-slow">Analyzing your marketing image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className={cn('my-4', className)}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-8 animate-fade-in', className)}>
      {groupedRecommendations && Object.entries(groupedRecommendations).map(([type, recs]) => (
        recs.length > 0 && (
          <div key={type} className="space-y-4">
            <h3 className="text-lg font-medium capitalize">
              {type === 'positive' ? 'What works well' : 
               type === 'improvement' ? 'Areas to improve' : 
               'Suggestions'}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {recs.map(recommendation => (
                <RecommendationCard 
                  key={recommendation.id} 
                  recommendation={recommendation} 
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ImageAnalysis;
