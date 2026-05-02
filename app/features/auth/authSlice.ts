import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "./authApi";

interface AuthState {
  user: AuthUser | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.isInitialized = true;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
