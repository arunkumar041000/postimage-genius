
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, MessageSquare, Sparkles, BarChart, Zap } from 'lucide-react';

const features = [
  {
    title: "AI-Powered Insights",
    description: "Advanced analysis using OpenAI & Gemini",
    icon: Brain
  },
  {
    title: "Text & Message Clarity",
    description: "Evaluate readability and message effectiveness",
    icon: MessageSquare
  },
  {
    title: "Color Psychology",
    description: "Understand emotional impact of your color choices",
    icon: Sparkles
  },
  {
    title: "Engagement Prediction",
    description: "Forecast how your audience will respond",
    icon: BarChart
  },
  {
    title: "Instant Improvement Tips",
    description: "Actionable suggestions to enhance your visuals",
    icon: Zap
  }
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge capabilities to optimize your marketing visuals
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-md hover:border-primary/20">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
