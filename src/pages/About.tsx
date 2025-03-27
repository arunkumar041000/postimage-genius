
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/">
            <ArrowLeft className="mr-1" />
            Back to Analyzer
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Marketing Image Analyzer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Harness the power of AI to improve your marketing images and drive better results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 text-brand" />
                What We Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/80">
                Our AI-powered tool analyzes marketing images and provides actionable insights to improve 
                their effectiveness. Upload any marketing visual to receive detailed recommendations on what works well, 
                what could be improved, and specific suggestions to enhance engagement and conversion.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 text-brand" />
                Who It's For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/80">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Marketing professionals looking to optimize visual content</li>
                  <li>Social media managers seeking to improve engagement</li>
                  <li>Small business owners wanting professional feedback</li>
                  <li>Content creators enhancing their visual storytelling</li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 text-brand" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Upload Your Image</h3>
                <p className="text-sm text-muted-foreground">Drag and drop or select any marketing image you want to analyze</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Our AI examines your image for composition, messaging, branding, and appeal</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Get Recommendations</h3>
                <p className="text-sm text-muted-foreground">Receive detailed insights on strengths, areas for improvement, and actionable suggestions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2 text-brand" />
              Future Enhancements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-1">User Accounts</h3>
                <p className="text-xs text-muted-foreground">Save your analysis history and preferences</p>
              </div>
              
              <div className="p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-1">Batch Processing</h3>
                <p className="text-xs text-muted-foreground">Analyze multiple images simultaneously</p>
              </div>
              
              <div className="p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-1">Advanced Analytics</h3>
                <p className="text-xs text-muted-foreground">Detailed metrics and performance benchmarking</p>
              </div>
              
              <div className="p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-1">Competitor Analysis</h3>
                <p className="text-xs text-muted-foreground">Compare your images against competitors</p>
              </div>
              
              <div className="p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-1">Design Integration</h3>
                <p className="text-xs text-muted-foreground">Connect with design tools for direct edits</p>
              </div>
              
              <div className="p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-1">Industry Insights</h3>
                <p className="text-xs text-muted-foreground">Tailored analysis for different sectors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
