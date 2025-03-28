
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Clock, Image, Trash2 } from 'lucide-react';

export interface AnalysisHistoryItem {
  id: string;
  createdAt: string;
  imageUrl: string;
  prompt?: string;
}

interface AnalyzerSidebarProps {
  historyItems: AnalysisHistoryItem[];
  onSelectItem: (item: AnalysisHistoryItem) => void;
  onDeleteItem?: (id: string) => void;
  currentItemId?: string;
}

const AnalyzerSidebar = ({
  historyItems,
  onSelectItem,
  onDeleteItem,
  currentItemId,
}: AnalyzerSidebarProps) => {
  // Sort history items by date (newest first)
  const sortedItems = [...historyItems].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between items-center px-2 py-2">
          <h2 className="text-sm font-semibold">Analysis History</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Analyses</SidebarGroupLabel>
          <ScrollArea className="h-[calc(100vh-180px)]">
            {sortedItems.length > 0 ? (
              <SidebarMenu>
                {sortedItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      isActive={currentItemId === item.id}
                      onClick={() => onSelectItem(item)}
                      className="flex items-start"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground truncate">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs truncate mt-1">
                            {item.prompt ? item.prompt.substring(0, 30) + (item.prompt.length > 30 ? '...' : '') : 'No prompt'}
                          </p>
                        </div>
                      </div>
                    </SidebarMenuButton>
                    {onDeleteItem && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-muted-foreground">
                <Image className="h-12 w-12 mb-3 opacity-20" />
                <p className="text-sm">No analysis history yet</p>
                <p className="text-xs mt-1">
                  Analyze an image to see it here
                </p>
              </div>
            )}
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AnalyzerSidebar;
