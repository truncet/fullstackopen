import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types';


const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message, visible: true };
    case 'HIDE_NOTIFICATION':
      return { ...state, visible: false };
    default:
      return state;
  }
};

const NotificationContext = createContext()

export const useNotification = () => {
  const [notificationState, dispatch] = useContext(NotificationContext);
  const showNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', message });
  };

  return showNotification;
};

export const NotificationContextProvider = (props) => {
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, { message: '', visible: false });

  return (
    <NotificationContext.Provider value={[notificationState, notificationDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )

}

export default NotificationContext

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

