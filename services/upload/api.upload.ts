"use client";

import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import constants from "@/settings/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.API_SERVER,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const UploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({
    uploadImage: build.mutation({
      query: (body: FormData) => {
        return {
          url: `/categories/upload-buffer`,
          method: "POST",
          body: body,
          flashError: true,
          formData: true,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = UploadApi;
