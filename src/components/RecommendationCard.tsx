
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export interface Recommendation {
  id: string;
  type: 'positive' | 'improvement' | 'suggestion';
  title: string;
  description: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  className?: string;
}

const parseBoldText = (text: string) => {
  return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};
 
const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation,
  className 
}) => {
  const { theme } = useTheme();
  const { type, title, description } = recommendation;
  
  const iconMap = {
    positive: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    improvement: <AlertCircle className="h-5 w-5 text-amber-500" />,
    suggestion: <Lightbulb className="h-5 w-5 text-brand" />
  };
  
  const backgroundMap = {
    positive: theme === 'dark' ? 'bg-green-950/40 border-green-900/50' : 'bg-green-50 border-green-100',
    improvement: theme === 'dark' ? 'bg-amber-950/40 border-amber-900/50' : 'bg-amber-50 border-amber-100',
    suggestion: theme === 'dark' ? 'bg-blue-950/40 border-blue-900/50' : 'bg-blue-50 border-blue-100'
  };

  const textColorClass = theme === 'dark' ? 'text-foreground' : 'text-foreground/80';

  return (
    <Card 
      className={cn(
        'transform transition-all duration-300 ease-in-out', 
        'hover:shadow-elevated hover:-translate-y-1',
        backgroundMap[type],
        'h-full', // Add height to fill carousel item
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {iconMap[type]}
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className={textColorClass + " text-sm"}>
          {parseBoldText(description)}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
