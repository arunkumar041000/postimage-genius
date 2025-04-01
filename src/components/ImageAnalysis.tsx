
import React from 'react';
import { cn } from '@/lib/utils';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import LoadingSpinner from './LoadingSpinner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

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
  const { theme } = useTheme();
  
  // Group recommendations by type for better organization
  const groupedRecommendations = recommendations
    ? {
        positive: recommendations.filter(r => r.type === 'positive'),
        improvement: recommendations.filter(r => r.type === 'improvement'),
        suggestion: recommendations.filter(r => r.type === 'suggestion')
      }
    : null;

  const headingClass = theme === 'dark' ? 'text-foreground' : 'text-foreground';
  const loadingTextClass = theme === 'dark' ? 'text-foreground/70' : 'text-muted-foreground';

  if (isLoading) {
    return (
      <div className={cn('py-16 flex flex-col items-center justify-center gap-4', className)}>
        <LoadingSpinner size="lg" />
        <p className={`${loadingTextClass} animate-pulse-slow`}>Analyzing your marketing image...</p>
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
            <h3 className={`text-lg font-medium capitalize ${headingClass}`}>
              {type === 'positive' ? 'What works well' : 
               type === 'improvement' ? 'Areas to improve' : 
               'Suggestions'}
            </h3>
            <Carousel className="w-full">
              <CarouselContent className="flex flex-nowrap gap-4">
                {recs.map(recommendation => (
                  <CarouselItem key={recommendation.id} className="basis-full md:basis-1/2 lg:basis-1/3 min-w-0 flex-shrink-0">
                    <RecommendationCard recommendation={recommendation} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center mt-3">
                <CarouselPrevious className="static mx-2 translate-y-0" />
                <CarouselNext className="static mx-2 translate-y-0" />
              </div>
            </Carousel>
          </div>
        )
      ))}
    </div>
  );
};

export default ImageAnalysis;
