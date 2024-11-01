import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cozeApi = createApi({
  reducerPath: "cozeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coze.com/v3/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Bearer pat_OKIldJWHZzfUmYAdqcj3UueLONqYxCERv5txHzPNe6xuroFT2tyaSXKWOS8zPiCP"
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postChatMessage: builder.mutation({
      query: (data) => ({
        url: "chat",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostChatMessageMutation } = cozeApi;
