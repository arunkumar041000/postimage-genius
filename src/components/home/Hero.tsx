
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { AnimatedGradient } from '@/components/AnimatedGradient';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <AnimatedGradient />
      </div>
      
      <div className="container px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by OpenAI & Gemini
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-6 md:text-5xl lg:text-6xl leading-tight">
            Analyze Posters Smarter with AI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Instantly evaluate marketing & campaign visuals using advanced AI to improve engagement and effectiveness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link to="/analyzer">Try It Free <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="h-4 w-4" /> Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="rounded-xl overflow-hidden border shadow-lg bg-card">
              <img 
                src="/placeholder.svg" 
                alt="AI analyzing a poster" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-4">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-sm font-medium">
                  AI analyzing poster elements in real-time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
