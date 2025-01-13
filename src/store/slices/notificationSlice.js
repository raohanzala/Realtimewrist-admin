import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: []  
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    set_notifications: (state, { payload }) => { 
      console.log(payload, 'PAYLOAD ') 
      state.notifications.push(payload);
    },
    remove_notification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (item) => item.orderId !== payload.notificationId
      );
    },
    clear_notifications: (state) => {
      state.notifications = state.initialState;
    },
  },
});

export const { set_notifications, remove_notification, clear_notifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
