
import { DestinationProfileShort, UserProfile } from "@/models/profileData";
import api from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

const DESTINATIONS_PER_PAGE = 10;

export const useUserProfile = (userId?: number) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [destinations, setDestinations] = useState<DestinationProfileShort[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [profileError, setProfileError] = useState<string | null>(null);
  const [destinationsError, setDestinationsError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (!userId) return;

    if (!isRefresh) {
      setIsLoadingProfile(true);
    }else{
      setHasMore(true);
    }
    setProfileError(null);
    setDestinationsError(null);

    const initialPage = 1;

    const profilePromise = api.get(`/users/${userId}/profile`)
      .then(res => setProfile(res.data))
      .catch(e => {
        console.error("Error cargando el perfil:", e);
        setProfileError("No se pudo cargar el perfil.");
        setProfile(null);
      });

    const destinationsPromise = api.get(`/users/${userId}/destinations?page=${initialPage}&per_page=${DESTINATIONS_PER_PAGE}`)
      .then(res => {
        setDestinations(res.data.destinations);
        setHasMore(res.data.pagination.has_more);
        setPage(initialPage);
      })
      .catch(e => {
        console.error("Error cargando los destinos:", e);
        setDestinationsError("No se pudieron cargar los viajes.");
        setDestinations([]);
        setHasMore(false)
      });

     await Promise.all([profilePromise, destinationsPromise]);
      setIsLoadingProfile(false);
      if(isRefresh) setIsRefreshing(false);

  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function loadMoreDestinations() {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await api.get(`/users/${userId}/destinations?page=${nextPage}&per_page=${DESTINATIONS_PER_PAGE}`);
      const newDestinations = res.data.destinations;

      setDestinations(prev => [...prev, ...newDestinations]);
      setHasMore(res.data.pagination.has_more);
      setPage(nextPage);

    } catch (e) {
      console.error("Error cargando más destinos:", e);
      setDestinationsError("Error al cargar más viajes.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData(true);
  }, [fetchData]);


  return {
    profile,
    destinations,
    isLoading: isLoadingProfile,
    isLoadingMore,
    isRefreshing,
    hasMore,
    error: profileError || destinationsError,
    profileError,
    destinationsError,
    loadMoreDestinations,
    handleRefresh,
  };
};