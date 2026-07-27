// hooks/useStore.ts
import { useEffect } from 'react';
import { useStore } from '@/store';
import storeApi from '@/services/storeApi';

export const useStoreActions = () => {
  const { 
    businesses, 
    loading, 
    error, 
    total, 
    page, 
    filters,
    setBusinesses,
    setLoading,
    setError,
    setTotal,
    setPage,
    setFilters,
    resetStore
  } = useStore();

  const searchBusinesses = async (pageNum: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await storeApi.searchBusinesses({
        serviceName: filters.serviceName || undefined,
        location: filters.location || undefined,
        page: pageNum,
        limit: 24,
      });
      
      if (response.success) {
        setBusinesses(response.data.items);
        setTotal(response.data.total);
        setPage(response.data.page);
      } else {
        setError('Failed to fetch businesses');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
  };

  const resetAll = () => {
    resetStore();
  };

  return {
    businesses,
    loading,
    error,
    total,
    page,
    filters,
    searchBusinesses,
    updateFilters,
    resetAll,
  };
};