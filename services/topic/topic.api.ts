"use client";

import { TypeNews } from "../../healper/type/news.type";

import { baseApi } from "@/store/baseQuery";

export const topicAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTopics: build.query({
      query: (params) => ({
        url: "/topics",
        params: params,
        method: "GET",
        flashError: true,
      }),
      providesTags: ["Topic"],
    }),
    getTopic: build.query<TypeNews, { id: string }>({
      query: ({ id }) => ({
        url: `/topics/${id}`,
        method: "GET",
        flashError: true,
      }),
      providesTags: (result, error, { id }) => [{ type: "Topic", id }],
    }),
  }),
});

export const { useGetAllTopicsQuery, useGetTopicQuery } = topicAPI;
