import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { UserWithConnectionStatus } from '@/models/userConnections';
import api from '@/utils/api';
import { ApiResponse } from './AuthContext';
import { handleApiError } from '@/utils/errorHandler';
import User from '@/models/user';
import { PaginationInfo } from '@/models/notification';

interface SuggestedUsersContextType {
  suggestedUsers: UserWithConnectionStatus[];
  updateUserStatus: (userId: number, newStatus: UserWithConnectionStatus["connection_status"]) => void;
  addConnectingUserId: (userId: number) => void;
  removeConnectingUserId: (userId: number) => void;
  isUserConnecting: (userId: number) => boolean;
  getSuggestedUsers: (page: number) => Promise<{ success: boolean }>;
  refreshSuggestedUsers: () => void;
  hasMore: boolean;
  isInitialized: boolean;
  handleLoadMoreSuggestedUsers: () => void;
  loadingSuggested: boolean;
  sendConnectionRequest: (userId: number) => Promise<ApiResponse>;
  cancelConnectionRequest: (userId: number) => Promise<ApiResponse>;
  page: number;
  setPage: (page: number) => void;

  pendingConnectionRequests: User[];
  loadingPendingRequests: boolean;
  getPendingConnectionRequests: (page?: number) => Promise<void>;
  acceptConnectionRequest: (userId: number) => Promise<ApiResponse>;
  denyConnectionRequest: (userId: number) => Promise<ApiResponse>;
  pendingRequestsHasMore: boolean;
  loadMorePendingRequests: () => Promise<void>;
  refreshPendingRequests: () => Promise<void>;
}

export const SuggestedUsersContext = createContext<SuggestedUsersContextType | undefined>(undefined);

export const SuggestedUsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suggestedUsers, setSuggestedUsers] = useState<UserWithConnectionStatus[]>([]);
  const [connectingUserIds, setConnectingUserIds] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingSuggested, setLoadingSuggested] = useState(false);

  const [pendingConnectionRequests, setPendingConnectionRequests] = useState<User[]>([]);
  const [loadingPendingRequests, setLoadingPendingRequests] = useState(false);
  const [pendingRequestsPage, setPendingRequestsPage] = useState(1);
  const [pendingRequestsHasMore, setPendingRequestsHasMore] = useState(true);

  const addConnectingUserId = (userId: number) =>
    setConnectingUserIds((prev) => [...prev, userId]);

  const removeConnectingUserId = (userId: number) =>
    setConnectingUserIds((prev) => prev.filter((id) => id !== userId));

  const isUserConnecting = (userId: number) => connectingUserIds.includes(userId);

  const updateUserStatus = (
    userId: number,
    newStatus: UserWithConnectionStatus["connection_status"]
  ) => {
    setSuggestedUsers((prevSuggestedUsers) =>
      prevSuggestedUsers.map((u) =>
        u.id === userId ? { ...u, connection_status: newStatus } : u
      )
    );
  };
 

  const getSuggestedUsers = useCallback(async (page = 1, force?: boolean): Promise<{ success: boolean }> => {

    if (loadingSuggested) return { success: false };

    if (!force && page === 1 && isInitialized && !loadingSuggested) return { success: true };
  
    if(page > 1 && !hasMore) return { success: false}

    setLoadingSuggested(true);
    try {
      const response = await api.get("/users/suggested", { params: { page, per_page: 10 },});

      const usersWithStatus = response.data.users.map((user: any) => ({
        ...user,
        connection_status: "none" as UserWithConnectionStatus["connection_status"],
      }));

      setSuggestedUsers((prev) => {
        if (page === 1) {
          return usersWithStatus;
        } else {
          const existingIds = new Set(prev.map((user : any) => user.id));
          const newUsers = usersWithStatus.filter((user: any) => !existingIds.has(user.id));
          return [...prev, ...newUsers];
        }
      });

      setHasMore(response.data.pagination.has_more);
      if (page === 1) setIsInitialized(true);
      return { success: true };
    } catch (error) {
      console.error("Error fetching suggested users:", error);
      return { success: false };
    } finally {
      setLoadingSuggested(false);
    }
  }, [loadingSuggested, hasMore, isInitialized]);

  const handleLoadMoreSuggestedUsers = useCallback(async () => {
    if (!loadingSuggested && hasMore) {
      const nextPage = page + 1;
      const result = await getSuggestedUsers(nextPage);
      if (result.success) {
        setPage(nextPage);
      }
    }
  }, [loadingSuggested, hasMore, page, getSuggestedUsers]);

  const refreshSuggestedUsers = useCallback(async () => {
    if(loadingSuggested) return;
    setSuggestedUsers([]);
    setIsInitialized(false);
    setPage(1);
    setHasMore(true);
    await getSuggestedUsers(1, true);
  }, [loadingSuggested, getSuggestedUsers]);

  const sendConnectionRequest = async (userId: number) => {
    try {
      await api.post(`/connections/request/${userId}`);
      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  };

  const cancelConnectionRequest = async (userId: number) => {
    try {
      await api.delete(`/connections/${userId}`);
      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  };

  const getPendingConnectionRequests = useCallback(async (page = 1): Promise<void> => {
    if (loadingPendingRequests) return;
    
    setLoadingPendingRequests(true);
    try {
      const response = await api.get<{ requests: User[]; pagination: PaginationInfo }>(
        '/connections/pending',
        { params: { page, per_page: 10 } }
      );

      setPendingConnectionRequests(prev => 
        page === 1 ? response.data.requests : [...prev, ...response.data.requests]
      );
      setPendingRequestsHasMore(response.data.pagination.has_more);
      setPendingRequestsPage(page);

    } catch (error) {
      console.error("Error fetching pending friend requests:", error);
      if (page === 1) setPendingConnectionRequests([]);
    } finally {
      setLoadingPendingRequests(false);
    }
  }, [loadingPendingRequests]);

  const loadMorePendingRequests = useCallback(async () => {
  if (!loadingPendingRequests && pendingRequestsHasMore) {
    const nextPage = pendingRequestsPage + 1;
    await getPendingConnectionRequests(nextPage);
  }
}, [loadingPendingRequests, pendingRequestsHasMore, pendingRequestsPage, getPendingConnectionRequests]);

  const refreshPendingRequests = useCallback(async () => {
    setPendingRequestsPage(1);
    setPendingRequestsHasMore(true);
    await getPendingConnectionRequests(1);
  }, [getPendingConnectionRequests]);

  const acceptConnectionRequest = async (userId: number): Promise<ApiResponse> => {
    try {
      await api.patch(`/connections/accept/${userId}`);
      setPendingConnectionRequests(prev => prev.filter(req => req.id !== userId));

      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  };

  const denyConnectionRequest = async (userId: number): Promise<ApiResponse> => {
    try {
      await api.delete(`/connections/${userId}`);
      setPendingConnectionRequests(prev => prev.filter(req => req.id !== userId));
      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  };


  return (
    <SuggestedUsersContext.Provider
        value={{
            suggestedUsers,
            updateUserStatus,
            addConnectingUserId,
            removeConnectingUserId,
            isUserConnecting,
            getSuggestedUsers,
            refreshSuggestedUsers,
            hasMore,
            loadingSuggested,
            handleLoadMoreSuggestedUsers,
            isInitialized,
            sendConnectionRequest,
            cancelConnectionRequest,
            page,
            setPage,
            pendingConnectionRequests,
            loadingPendingRequests,
            getPendingConnectionRequests,
            acceptConnectionRequest,
            denyConnectionRequest,
            pendingRequestsHasMore,
            loadMorePendingRequests,
            refreshPendingRequests,
        }}
    >
      {children}
    </SuggestedUsersContext.Provider>
  );
};

