import { useState, useEffect, useCallback } from 'react';
import { UserProfileTripItem } from '@/models/profileData';
import api from '@/utils/api';

const TRIPS_PER_PAGE = 10;

export const useDestinationTrips = (userId?: number, destinationId?: number) => {
  const [trips, setTrips] = useState<UserProfileTripItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async (isRefresh = false) => {
    if (!userId || !destinationId) {
        setIsLoading(false);
        return;
    }

    const initialPage = 1;
    if (isRefresh) {
        setPage(initialPage);
        setHasMore(true);
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get(`/users/${userId}/destinations/${destinationId}/trips?page=${initialPage}&per_page=${TRIPS_PER_PAGE}`);
      setTrips(res.data.trips);
      setHasMore(res.data.pagination.has_more);
    } catch (e) {
      console.error("Error cargando los viajes del destino:", e);
      setError("No se pudieron cargar los viajes.");
    } finally {
      setIsLoading(false);
    }
  }, [userId, destinationId]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);


  const loadMoreTrips = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    try {
        const res = await api.get(`/users/${userId}/destinations/${destinationId}/trips?page=${nextPage}&per_page=${TRIPS_PER_PAGE}`);
        setTrips(prev => [...prev, ...res.data.trips]);
        setHasMore(res.data.pagination.has_more);
        setPage(nextPage);
    } catch (e) {
      console.error("Error cargando más viajes:", e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    trips,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMoreTrips,
    reload: fetchTrips
  };
};