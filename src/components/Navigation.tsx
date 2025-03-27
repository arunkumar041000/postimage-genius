
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Info, BarChart } from 'lucide-react';

const Navigation = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-semibold text-xl flex items-center gap-2">
          <span className="text-primary">Marketing</span> Analyzer
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/analyzer">
              <BarChart className="h-4 w-4 mr-1" />
              Analyzer
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/about">
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
