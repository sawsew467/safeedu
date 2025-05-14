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
    }),
    getNews: build.query({
      query: ({ id }) => ({
        url: `/news/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useGetAllNewsQuery, useGetNewsQuery } = newsAPI;
