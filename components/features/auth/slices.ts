import { authAPI } from "@/services/auth/auth.api";
import constants from "@/settings/constants";
import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
export interface AuthState {
  access_token: string;
  refresh_token: string;
  notifyca_update_profile: boolean;
}

const initialState: AuthState = {
  access_token: "",
  refresh_token: "",
  notifyca_update_profile: true,
};

(async () => {
  const notifyca_update_profile = await SecureStore.getItemAsync(
    constants.NOTIFYCA_UPDATE_PROFILE
  );
  initialState.notifyca_update_profile =
    notifyca_update_profile === "false" ? false : true;
})();

(async () => {
  const token = await SecureStore.getItemAsync(constants.ACCESS_TOKEN);
  initialState.access_token = token ?? "";
})();
(async () => {
  const token = await SecureStore.getItemAsync(constants.REFRESH_TOKEN);
  initialState.refresh_token = token ?? "";
})();

const save = async (key: string, value: string) => {
  SecureStore.setItemAsync(key, value);
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;

      save(constants.ACCESS_TOKEN, action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload;

      save(constants.REFRESH_TOKEN, action.payload);
    },
    setNotifycaUpdateProfile: (state, action) => {
      state.notifyca_update_profile = action.payload;

      save(constants.NOTIFYCA_UPDATE_PROFILE, action.payload.toString());
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.access_token = payload.data.access_token;
        state.refresh_token = payload.data.refresh_token;

        save(constants.ACCESS_TOKEN, payload.data.access_token);
        save(constants.REFRESH_TOKEN, payload.data.refresh_token);
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, setRefreshToken, setNotifycaUpdateProfile } =
  authSlice.actions;

export default authSlice.reducer;
