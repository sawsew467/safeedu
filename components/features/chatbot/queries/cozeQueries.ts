import constants from "@/settings/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cozeApi = createApi({
  reducerPath: "cozeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coze.com/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${constants.AI_TOKEN}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createConversation: builder.mutation<any, void>({
      query: () => ({
        url: "v1/conversation/create",
        method: "POST",
      }),
    }),
    createChat: builder.mutation({
      query: ({ params, data }) => ({
        url: "v3/chat",
        method: "POST",
        body: data,
        params: params,
      }),
    }),
    getChatMessages: builder.mutation({
      query: ({ params }) => ({
        url: "v3/chat/message/list",
        method: "POST",
        params: params,
      }),
    }),
  }),
});

export const {
  useGetChatMessagesMutation,
  useCreateConversationMutation,
  useCreateChatMutation,
} = cozeApi;
