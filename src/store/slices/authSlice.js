import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {  
      state.token = payload.token;
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.token = initialState.token
    },
    userData : ()=> {
      
    }
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
