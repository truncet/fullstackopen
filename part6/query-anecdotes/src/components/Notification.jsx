import React, { useContext, useEffect } from 'react';
import NotificationContext from '../notificationContext';

const Notification = () => {
  const [notificationState, notificationDispatch] = useContext(NotificationContext);
  useEffect(() => {
    if (notificationState.visible) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationState.visible, notificationDispatch]);

  if (!notificationState.visible) return null;

  return (
    <div className="notification">
      {notificationState.message}
    </div>
  );
};

export default Notification;
