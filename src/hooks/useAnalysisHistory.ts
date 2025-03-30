
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AnalysisHistoryItem } from '@/components/AnalyzerSidebar';

export function useAnalysisHistory() {
  const { currentUser } = useAuth();
  const [historyItems, setHistoryItems] = useState<AnalysisHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [currentHistoryItemId, setCurrentHistoryItemId] = useState<string | undefined>(undefined);

  const fetchAnalysisHistory = async () => {
    if (!currentUser) return;
    
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching history:', error);
        toast.error('Failed to load analysis history');
      } else if (data) {
        const historyItems: AnalysisHistoryItem[] = data.map(item => ({
          id: item.id,
          imageUrl: item.image_url,
          createdAt: item.created_at,
          prompt: item.prompt || undefined
        }));
        setHistoryItems(historyItems);
      }
    } catch (err) {
      console.error('Error in fetchAnalysisHistory:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSelectHistoryItem = async (item: AnalysisHistoryItem) => {
    setCurrentHistoryItemId(item.id);
    
    try {
      // Fetch the full analysis data
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('id', item.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (err) {
      console.error('Error loading history item:', err);
      toast.error('Failed to load analysis from history');
      return null;
    }
  };

  const handleDeleteHistoryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) {
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('analysis_history')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Refresh history
      fetchAnalysisHistory();
      toast.success('Analysis deleted');
      return true;
    } catch (err) {
      console.error('Error deleting history item:', err);
      toast.error('Failed to delete analysis');
      return false;
    }
  };

  // Load history from Supabase when user is authenticated
  useEffect(() => {
    if (currentUser) {
      fetchAnalysisHistory();
    }
  }, [currentUser]);

  return {
    historyItems,
    isLoadingHistory,
    currentHistoryItemId,
    setCurrentHistoryItemId,
    fetchAnalysisHistory,
    handleSelectHistoryItem,
    handleDeleteHistoryItem
  };
}
