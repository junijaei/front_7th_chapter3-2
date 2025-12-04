import { Notification } from '@/models/notification';
import { useCallback, useState } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification['type'] = 'info') => {
      const notification: Notification = {
        id: Date.now() + Math.random(), // 고유 ID 생성
        message,
        type,
      };

      setNotifications((prev) => [...prev, notification]);

      // 3초 후 자동 제거
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 3000);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
