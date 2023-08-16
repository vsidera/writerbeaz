import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailAddress: "",
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEmailAddress: (state, action) => {
      state.emailAddress = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setEmailAddress, setUser, clearUser } = appSlice.actions;

const store = configureStore({
  reducer: appSlice.reducer,
});

export default store;
