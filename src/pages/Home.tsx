
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
  UserPlus,
  Upload as UploadIcon, 
  LineChart, 
  ExternalLink
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Navigation from '@/components/Navigation';

const testimonials = [
  {
    quote: "This tool transformed our social media strategy. We're seeing 40% more engagement since implementing its suggestions.",
    name: "Sarah J.",
    role: "Marketing Director"
  },
  {
    quote: "As a small business owner, this is like having a professional marketing consultant on demand. Incredible value!",
    name: "Michael R.",
    role: "Ecommerce Founder"
  },
  {
    quote: "I've tried many AI tools, but this one actually gives practical advice I can implement immediately.",
    name: "Priya K.",
    role: "Content Creator"
  }
];

const targetUsers = [
  {
    title: "Marketing Pros",
    description: "Get data-driven insights to optimize campaign visuals",
    icon: BarChart
  },
  {
    title: "Social Media Managers",
    description: "Boost engagement with perfectly optimized content",
    icon: Zap
  },
  {
    title: "Small Business Owners",
    description: "Professional marketing advice without the agency price tag",
    icon: Users
  },
  {
    title: "Content Creators",
    description: "Stand out with visuals that capture and convert",
    icon: ImageIcon
  }
];

const futureFeatures = [
  {
    title: "User Accounts",
    description: "Save history and preferences",
    icon: UserPlus
  },
  {
    title: "Batch Processing",
    description: "Analyze multiple images at once",
    icon: UploadIcon
  },
  {
    title: "Competitor Analysis",
    description: "See how you compare to others",
    icon: BarChart
  },
  {
    title: "Design Integration",
    description: "Connect with Canva and Figma",
    icon: ExternalLink
  },
  {
    title: "Performance Tracking",
    description: "Monitor improvements over time",
    icon: LineChart
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container px-4 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
          <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-6 md:text-5xl lg:text-6xl max-w-3xl mx-auto">
          Optimize Your Marketing Images with AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Get instant, intelligent feedback on your visual content to improve engagement and performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/">Analyze an Image</Link>
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative border rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/placeholder.svg" 
              alt="AI Image Analysis" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-black/60 backdrop-blur-md p-5 rounded-lg border border-white/10 text-white max-w-md">
                <p className="font-medium text-lg">Image analysis in progress...</p>
                <div className="flex gap-2 mt-3 text-xs text-white/70">
                  <div className="animate-pulse">Analyzing color scheme</div>
                  <div className="animate-pulse delay-300">Evaluating composition</div>
                  <div className="animate-pulse delay-700">Generating recommendations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered tool makes it easy to get professional feedback on your marketing images
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload Your Image</h3>
            <p className="text-muted-foreground">Drag and drop or select any marketing image you want to analyze</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Instant Analysis</h3>
            <p className="text-muted-foreground">AI processes the image using GPT-4o's advanced visual understanding</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Improve Your Visuals</h3>
            <p className="text-muted-foreground">Get categorized feedback and actionable tips to enhance your images</p>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why thousands of marketers trust our AI-powered image analysis
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Professional-Grade Analysis</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Boost Engagement</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Targeted Suggestions</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Powered by GPT-4o</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Secure and Private</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Target Users */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Who It's For</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for everyone who works with marketing visuals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {targetUsers.map((user, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <user.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium mb-2">{user.title}</h3>
                <p className="text-sm text-muted-foreground">{user.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from marketers who've improved their visual content
            </p>
          </div>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-card/70 backdrop-blur-sm border-primary/10">
                    <CardContent className="pt-6 px-8 py-10 text-center">
                      <blockquote className="text-xl mb-6 italic text-foreground/90">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
      
      {/* Future Vision */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Future Enhancements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our roadmap for making image analysis even more powerful
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {futureFeatures.map((feature, index) => (
            <Card key={index} className="border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/5 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your images?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start analyzing your marketing visuals and get actionable insights today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/">Upload Now</Link>
            </Button>
            <Button size="lg" variant="outline">
              Try with Sample Image
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container px-4 py-12 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-1 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Built with React, Vite, Tailwind & GPT-4o
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
