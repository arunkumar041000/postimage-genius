
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-70"></div>
      </div>
      
      <div className="container px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your posters with AI?</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Start analyzing your marketing visuals and get actionable insights today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="gap-2">
            <Link to="/analyzer">Start Free <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
