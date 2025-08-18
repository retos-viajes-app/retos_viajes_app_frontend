import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Define la estructura de respuesta que este hook espera de la función de fetching.
// Tu backend ya sigue este patrón con `completed_challenges` y `pagination`.
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    has_more: boolean;
  };
}

// La función de fetching que le pasaremos al hook.
// Recibe la página actual y devuelve los datos paginados.
type FetchFunction<T> = (page: number) => Promise<{
    completed_challenges: T[];
    pagination: { has_more: boolean; };
}>;


export function usePaginatedFeed<T>(fetchFunction: FetchFunction<T>) {
  const { t } = useTranslation();
  const [data, setData] = useState<T[]>([]);
  
  const [initialLoading, setInitialLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (currentPage: number, isRefresh: boolean = false) => {
    if ((isPaginating && !isRefresh) || (!hasMore && !isRefresh)) {
      if(isRefresh) setIsRefreshing(false);
      return;
    }

    if (currentPage === 1) {
      if (!isRefresh) setInitialLoading(true);
      setError(null);
    } else {
      setIsPaginating(true);
    }

    try {
      const response = await fetchFunction(currentPage);
      setData(prevData =>
        currentPage === 1 ? response.completed_challenges : [...prevData, ...response.completed_challenges]
      );
      setHasMore(response.pagination.has_more);
      if (currentPage === 1) setPage(1);
    } catch (err) {
      setError(t("errors.failedToLoadFeed"));
    } finally {
      if (currentPage === 1) setInitialLoading(false);
      else setIsPaginating(false);
      if (isRefresh) setIsRefreshing(false);
    }
  }, [fetchFunction, isPaginating, hasMore, t]);

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  const handleLoadMore = () => {
    if (!isPaginating && hasMore && !initialLoading && !isRefreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchData(1, true);
  };
  
  const updateDataItem = (updatedItem: T, key: keyof T) => {
    setData(prevData =>
      prevData.map(item => (item[key] === updatedItem[key] ? updatedItem : item))
    );
  };

  return {
    data,
    initialLoading,
    isPaginating,
    isRefreshing,
    error,
    hasMore,
    handleLoadMore,
    onRefresh,
    updateDataItem,
  };
}