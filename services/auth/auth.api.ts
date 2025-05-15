"use client";

import { baseApi } from "@/store/baseQuery";

export const competitionsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    getProvinces: build.query({
      query: () => ({
        url: "/provinces/provinces",
        method: "GET",
      }),
    }),
    getOrganizations: build.query({
      query: () => ({
        url: "/organizations",
        method: "GET",
      }),
    }),
    createCitizenAccount: build.mutation({
      query: (data) => {
        if (!data?.phone_number) delete data.phone_number;
        if (!data?.email) delete data.email;

        console.log("data", data);
        return {
          url: "/auth/sign-up-with-citizen",
          method: "POST",
          body: data,
        };
      },
    }),
    createStudentAccount: build.mutation({
      query: (data) => {
        if (!data?.phone_number) delete data.phone_number;
        if (!data?.email) delete data.email;
        return {
          url: "/auth/sign-up-with-student",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetOrganizationsQuery,
  useCreateCitizenAccountMutation,
  useCreateStudentAccountMutation,
  useSignInMutation,
} = competitionsAPI;
