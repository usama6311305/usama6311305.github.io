// store/index.ts
import { create } from 'zustand';
import { StoreSlice, StoreState } from '@/types/store';
import { BusinessWithServices } from '@/types/business';

const initialState: StoreState = {
  businesses: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 24,
  filters: {
    serviceName: '',
    location: '',
    category: undefined,
    sortBy: undefined,
  },
};

export const useStore = create<StoreSlice>((set) => ({
  ...initialState,

  setBusinesses: (items: BusinessWithServices[]) => set({ businesses: items }),
  
  setLoading: (loading: boolean) => set({ loading }),
  
  setError: (error: string | null) => set({ error }),
  
  setTotal: (total: number) => set({ total }),
  
  setPage: (page: number) => set({ page }),
  
  setFilters: (filters: Partial<StoreState['filters']>) => 
    set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
  
  resetStore: () => set(initialState),
}));