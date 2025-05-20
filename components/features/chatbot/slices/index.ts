import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  value: number;
}

const initialState: AuthState = {
  value: 0,
};

export const authSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
