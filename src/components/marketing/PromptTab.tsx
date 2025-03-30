
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface PromptTabProps {
  setActiveTab: (tab: string) => void;
  promptText: string;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAnalyzeImage: () => void;
  uploadedImage: File | null;
  isAnalyzing: boolean;
}

const PromptTab = ({ 
  setActiveTab, 
  promptText, 
  handlePromptChange, 
  handleAnalyzeImage, 
  uploadedImage, 
  isAnalyzing 
}: PromptTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
};

export default PromptTab;
