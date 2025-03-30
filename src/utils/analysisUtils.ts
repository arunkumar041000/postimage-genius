
import { AnalysisResult } from '@/types/analysis';
import { Recommendation } from '@/components/RecommendationCard';

export const convertToRecommendations = (result: AnalysisResult): Recommendation[] => {
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
