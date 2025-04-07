
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Target, Image as ImageIcon, Users, BarChart } from 'lucide-react';

const personas = [
  {
    title: "Marketers",
    description: "Optimize campaign visuals for maximum engagement",
    icon: Target
  },
  {
    title: "Designers",
    description: "Get AI feedback on visual hierarchy and impact",
    icon: ImageIcon
  },
  {
    title: "Campaign Managers",
    description: "Ensure your visuals align with campaign goals",
    icon: Users
  },
  {
    title: "Agencies",
    description: "Deliver data-backed design recommendations",
    icon: BarChart
  }
];

const Personas = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Who It's For</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for professionals who create and optimize visual content
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="flex flex-nowrap gap-4">
              {personas.map((persona, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/4 min-w-0 flex-shrink-0">
                  <Card className="h-full border-primary/10 transition-all hover:border-primary/30">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <persona.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-medium mb-2">{persona.title}</h3>
                      <p className="text-sm text-muted-foreground grow">{persona.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Personas;
