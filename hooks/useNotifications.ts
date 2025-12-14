import { NotificationItem, NotificationsResponse, PaginationInfo } from '@/models/notification';
import api from '@/utils/api';
import { useState, useCallback, useMemo } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasUnreadNotifications = useMemo(() => {
    return notifications.some(n => !n.is_read);
  }, [notifications]);
  
  const fetchNotifications = useCallback(async (page = 1, per_page = 15) => {
    if (loading && page === 1) return [];
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<NotificationsResponse>('/notifications', {
        params: { page, per_page }
      });
      const { notifications: newNotifications, pagination: newPagination } = response.data;

      setNotifications(prev => page === 1 ? newNotifications : [...prev, ...newNotifications]);
      setPagination(newPagination);

      return newNotifications;
    } catch (e) {
      console.error("Error fetching notifications:", e);
      setError('No se pudieron cargar las notificaciones.');
      return [];
    } finally {
      setLoading(false);
    }
  }, [loading]);

 
  const markAllAsRead = useCallback(async () => {
    try {
      await api.patch('/notifications/read-all');
    } catch (e) {
      console.error("Error marking notifications as read:", e);
    }
  }, []);

  return {
    notifications,
    pagination,
    loading,
    error,
    fetchNotifications,
    markAllAsRead,
    hasUnreadNotifications
  };
};