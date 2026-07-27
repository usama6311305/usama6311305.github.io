// hooks/useBusiness.ts
import { useState, useEffect, useCallback } from 'react';
import storeApi from '@/services/storeApi';
import { Business, Service, BusinessAvailability } from '@/types/business';

export const useBusinessSearch = (serviceName?: string, location?: string) => {
  const [businesses, setBusinesses] = useState<{ business: Business; services: Service[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchBusinesses = useCallback(async (pageNum: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storeApi.searchBusinesses({
        serviceName: serviceName || undefined,
        location: location || undefined,
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
  }, [serviceName, location]);

  useEffect(() => {
    fetchBusinesses(1);
  }, [fetchBusinesses]);

  return { businesses, loading, error, total, page, fetchBusinesses };
};

export const useBusinessDetails = (businessId: string) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!businessId) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await storeApi.getBusinessDetails(businessId);
        if (response.success) {
          setBusiness(response.data.business);
          setServices(response.data.services || []);
        } else {
          setError('Failed to fetch business details');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [businessId]);

  return { business, services, loading, error };
};

export const useBusinessAvailability = (businessId: string) => {
  const [availability, setAvailability] = useState<BusinessAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    if (!businessId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await storeApi.getAvailability(businessId);
      if (response.success) {
        setAvailability(response.data);
      } else {
        setError('Failed to fetch availability');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchAvailability();
    const interval = setInterval(fetchAvailability, 60000);
    return () => clearInterval(interval);
  }, [fetchAvailability]);

  return { availability, loading, error, refetch: fetchAvailability };
};