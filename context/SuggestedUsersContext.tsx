import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { UserWithConnectionStatus } from '@/models/userConnections';
import api from '@/utils/api';
import { ApiResponse } from './AuthContext';
import { handleApiError } from '@/utils/errorHandler';

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

  pendingConnectionRequests: ConnectionRequestUser[];
  loadingPendingRequests: boolean;
  getPendingConnectionRequests: () => Promise<void>;
  acceptConnectionRequest: (userId: number) => Promise<ApiResponse>;
  denyConnectionRequest: (userId: number) => Promise<ApiResponse>;
}

export interface ConnectionRequestUser {
  id: number;
  username: string;
  name: string;
  profile_photo_url?: string;
}

export const SuggestedUsersContext = createContext<SuggestedUsersContextType | undefined>(undefined);

export const SuggestedUsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suggestedUsers, setSuggestedUsers] = useState<UserWithConnectionStatus[]>([]);
  const [connectingUserIds, setConnectingUserIds] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingSuggested, setLoadingSuggested] = useState(false);

  const [pendingConnectionRequests, setPendingConnectionRequests] = useState<ConnectionRequestUser[]>([]);
  const [loadingPendingRequests, setLoadingPendingRequests] = useState(false);
  const [errorPendingRequests, setErrorPendingRequests] = useState<string | null>(null);

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
    if (loadingSuggested){
      return { success: false };
    }
    if (!force && page === 1 && isInitialized && !loadingSuggested){
      return { success: true };
    } 
    if(page > 1 && !hasMore) return { success: false}
    setLoadingSuggested(true);
    try {
      const response = await api.get("/users/suggested", {
        params: { page, per_page: 10 },
      });

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
      await api.delete(`/connections/request/cancel/${userId}`);
      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  };
   

  useEffect(() => {
    getPendingConnectionRequests();
  }, []);

  const getPendingConnectionRequests = useCallback(async (): Promise<void> => {
    if (loadingPendingRequests) return;
    setLoadingPendingRequests(true);
    setErrorPendingRequests(null);
    try {
      const response = await api.get<ConnectionRequestUser[]>('/connections/pending');

      setPendingConnectionRequests(response.data);

    } catch (error) {
      console.error("Error fetching pending friend requests:", error);
      setErrorPendingRequests(handleApiError(error));
      setPendingConnectionRequests([]);
    } finally {
      setLoadingPendingRequests(false);
    }
  }, []);

  const acceptConnectionRequest = async (userId: number): Promise<ApiResponse> => {
    try {
      await api.post(`/connections/accept/${userId}`);
      setPendingConnectionRequests(prev => prev.filter(req => req.id !== userId));

      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  };

  const denyConnectionRequest = async (userId: number): Promise<ApiResponse> => {
    try {
      await api.delete(`/connections/deny/${userId}`);
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
        }}
    >
      {children}
    </SuggestedUsersContext.Provider>
  );
};

