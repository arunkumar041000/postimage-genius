
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HomeFooter = () => {
  return (
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
  );
};

export default HomeFooter;
