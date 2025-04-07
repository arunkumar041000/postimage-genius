
import React from 'react';
import { Upload, Brain, Zap } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your marketing visuals in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-2">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Upload Your Poster</h3>
            <p className="text-muted-foreground">Drag & drop or select any marketing visual you want to analyze</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4 relative">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-2">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI Analysis Begins</h3>
            <p className="text-muted-foreground">Our AI examines text, color, emotion, and overall clarity</p>
            
            {/* Connector lines - only visible on desktop */}
            <div className="hidden md:block absolute left-[-50%] top-[30px] w-full h-0.5 border-t-2 border-dashed border-primary/20"></div>
            <div className="hidden md:block absolute right-[-50%] top-[30px] w-full h-0.5 border-t-2 border-dashed border-primary/20"></div>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4 relative">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-2">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">View Insights & Improve</h3>
            <p className="text-muted-foreground">Get actionable tips and enhancement suggestions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
