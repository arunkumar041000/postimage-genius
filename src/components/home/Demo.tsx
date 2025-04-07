
import React from 'react';

const Demo = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Live Demo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our AI analyzes and improves marketing visuals
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden border shadow-md">
            <img 
              src="/placeholder.svg" 
              alt="Before optimization" 
              className="w-full h-auto"
            />
            <div className="bg-muted/50 p-4 text-center">
              <span className="text-sm font-medium">Before Optimization</span>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden border shadow-md border-primary/20">
            <img 
              src="/placeholder.svg" 
              alt="After optimization" 
              className="w-full h-auto"
            />
            <div className="bg-primary/10 p-4 text-center">
              <span className="text-sm font-medium text-primary">After AI Recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
