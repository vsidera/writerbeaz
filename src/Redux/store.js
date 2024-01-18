import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailAddress: localStorage.getItem("emailAddress") || "",
  user: JSON.parse(localStorage.getItem("user")) || null,
  tokenExpiry: localStorage.getItem("tokenExpiry") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  accessToken: localStorage.getItem("accessToken") || null,
  profile: JSON.parse(localStorage.getItem("profile")) || null,
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
    setTokenExpiry: (state, action) => {
      state.tokenExpiry = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.emailAddress = "";
      state.tokenExpiry = null;
      state.refreshToken = null;
      state.accessToken = null;
      state.profile = null;
    },
  },
});

export const {
  setEmailAddress,
  setUser,
  setTokenExpiry,
  setRefreshToken,
  setAccessToken,
  setProfile,
  clearUser,
} = appSlice.actions;

const store = configureStore({
  reducer: appSlice.reducer,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("emailAddress", state.emailAddress);
  localStorage.setItem("user", JSON.stringify(state.user));
  localStorage.setItem("tokenExpiry", state.tokenExpiry);
  localStorage.setItem("refreshToken", state.refreshToken);
  localStorage.setItem("accessToken", state.accessToken);
  localStorage.setItem("profile", JSON.stringify(state.profile));
});

export default store;
