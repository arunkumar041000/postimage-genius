import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  Sparkles, 
  Zap, 
  Target, 
  Brain, 
  Lock, 
  Users, 
  Image as ImageIcon, 
  BarChart, 
  MessageSquare,
  Play, 
  ArrowRight
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Navigation from '@/components/Navigation';
import { AnimatedGradient } from '@/components/AnimatedGradient';

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

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
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
      
      {/* How It Works */}
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
      
      {/* Features */}
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
      
      {/* Who It's For */}
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
      
      {/* Demo/Case Study */}
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
      
      {/* Final CTA Banner */}
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
      
      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">Poster Analyzer</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Powered by OpenAI & Gemini
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
