
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const Navigation = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button variant="outline" size="sm" asChild>
        <Link to="/about">
          <Info className="h-4 w-4 mr-1" />
          About
        </Link>
      </Button>
    </div>
  );
};

export default Navigation;
