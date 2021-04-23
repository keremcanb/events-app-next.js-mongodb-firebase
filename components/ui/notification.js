/* eslint-disable default-case */
import { useContext } from 'react';
import classes from './notification.module.css';
import NotificationContext from '../../store/notification-context';

const Notification = ({ title, message, status }) => {
  const notificationCtx = useContext(NotificationContext);
  let statusClasses = '';

  switch (status) {
    case 'success':
      statusClasses = classes.success;
      break;
    case 'error':
      statusClasses = classes.error;
      break;
    case 'pending':
      statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
