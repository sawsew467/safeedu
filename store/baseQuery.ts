import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./index";
import constants from "@/settings/constants";
import { getClientCookie } from "@/lib/jsCookies";
import { getToken } from "@/utils/token-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.API_SERVER,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getToken();
    console.log("acc", accessToken);

    headers.set("Content-Type", "application/json");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["comment"],
});
