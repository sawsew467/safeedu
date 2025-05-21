"use client";

import DeleteAccount from "@/app/account/delete-account";
import { baseApi } from "@/store/baseQuery";

export const UserAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/students/get-profile/user",
        method: "GET",
        flashError: true,
      }),
      providesTags: ["students", "citizens"],
    }),
    getStudentByUsername: build.query({
      query: ({ username }) => ({
        url: `/students/username/${username}`,
        method: "GET",
        flashError: true,
      }),
      providesTags: ["students", "citizens"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `/students/update-profile`,
        method: "POST",
        body: data,
        flashError: true,
      }),
      invalidatesTags: (result, error) => {
        if (error) return [];

        return ["students", "citizens"];
      },
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/students/change-password",
        method: "POST",
        body: data,
        flashError: true,
      }),
    }),
    deleteAccount: build.mutation({
      query: () => ({
        url: "/students/delete",
        method: "DELETE",
        flashError: true,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetStudentByUsernameQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = UserAPI;
