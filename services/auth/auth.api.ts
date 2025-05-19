"use client";

import { baseApi } from "@/store/baseQuery";

export const authAPI = baseApi.injectEndpoints({
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
        url: "/provinces/all",
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
    forgotPassWord: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyCode: build.mutation({
      query: (data) => ({
        url: "/auth/verify-otp-forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetOrganizationsQuery,
  useCreateCitizenAccountMutation,
  useCreateStudentAccountMutation,
  useSignInMutation,
  useForgotPassWordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authAPI;
