// types/store.ts
import { BusinessWithServices } from './business';

export interface StoreState {
  businesses: BusinessWithServices[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  filters: {
    serviceName: string;
    location: string;
    category?: string;
    sortBy?: 'rating' | 'price' | 'distance';
  };
}

export interface StoreActions {
  setBusinesses: (items: BusinessWithServices[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotal: (total: number) => void;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<StoreState['filters']>) => void;
  resetStore: () => void;
}

export type StoreSlice = StoreState & StoreActions;