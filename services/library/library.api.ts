"use client";

import { TypeLibrary } from "../../healper/type/library.type";

import { baseApi } from "@/store/baseQuery";

export const newsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllLibrary: build.query({
      query: (params) => ({
        url: "/categories",
        params: params,
        method: "GET",
        flashError: true,
      }),
      providesTags: ["Library"],
    }),
    getLibrary: build.query<TypeLibrary, { id: string }>({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: "GET",
        flashError: true,
      }),
      providesTags: (result, error, { id }) => [{ type: "Library", id }],
    }),
  }),
});

export const { useGetAllLibraryQuery, useGetLibraryQuery } = newsAPI;
