import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useTimeAgo = () => {
  const { t } = useTranslation();

  const getTimeAgo = useCallback((date: Date | number | string): string => {
    const now = new Date();
    const timeDate = new Date(date);

    if (isNaN(timeDate.getTime())) {
      return "";
    }

    const diffInSeconds = Math.floor((now.getTime() - timeDate.getTime()) / 1000);

    if (diffInSeconds < 0) {
      return t('timeAgo.moment');
    }

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
      return t('timeAgo.minute', { count: minutes });
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return t('timeAgo.hour', { count: hours });
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return t('timeAgo.day', { count: days });
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return t('timeAgo.month', { count: months });
    }

    const years = Math.floor(days / 365);
    return t('timeAgo.year', { count: years });
  }, [t]);

  return getTimeAgo;
};