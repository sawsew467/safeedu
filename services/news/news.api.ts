"use client";

import { TypeNews } from "../../healper/type/news.type";

import { baseApi } from "@/store/baseQuery";

export const newsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNews: build.query({
      query: (params) => ({
        url: "/news",
        params: params,
        method: "GET",
        flashError: true,
      }),
      providesTags: ["News"],
    }),
    getNews: build.query<TypeNews, { id: string }>({
      query: ({ id }) => ({
        url: `/news/${id}`,
        method: "GET",
        flashError: true,
      }),
      providesTags: (result, error, { id }) => [{ type: "News", id }],
    }),
  }),
});

export const { useGetAllNewsQuery, useGetNewsQuery } = newsAPI;
