
import React from 'react';
import { Sparkles } from 'lucide-react';

const AnalyzerHeader = () => {
  return (
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
  );
};

export default AnalyzerHeader;
