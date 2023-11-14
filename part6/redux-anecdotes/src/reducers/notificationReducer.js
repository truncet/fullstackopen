import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Welcome to the Anecdote App!'; // Example initial message

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    }
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (message, duration) => {
  return async dispatch => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000); // Convert seconds to milliseconds
  };
};

export default notificationSlice.reducer;
