
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type SocialMediaPlatform = 'facebook' | 'instagram' | 'twitter';

interface SocialMediaBadgeProps {
  platform: SocialMediaPlatform;
  isSelected: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const platformIcons = {
  facebook: <Facebook className="h-4 w-4 mr-1" />,
  instagram: <Instagram className="h-4 w-4 mr-1" />,
  twitter: <Twitter className="h-4 w-4 mr-1" />,
};

const platformLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
};

const SocialMediaBadge: React.FC<SocialMediaBadgeProps> = ({
  platform,
  isSelected,
  onClick
}) => {
  return (
    <Badge 
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "cursor-pointer transition-all duration-200 flex items-center px-3 py-1.5",
        isSelected ? "bg-primary hover:bg-primary/90" : "hover:bg-secondary",
        "shadow-elevated",
        "text-sm font-medium"
      )}
      onClick={onClick}
    >
      {platformIcons[platform]}
      {platformLabels[platform]}
    </Badge>
  );
};

export default SocialMediaBadge;
