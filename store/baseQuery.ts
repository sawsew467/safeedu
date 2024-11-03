import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./index";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://nextexam-dev.azurewebsites.net/api/",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
