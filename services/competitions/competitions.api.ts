"use client";

import { baseApi } from "@/store/baseQuery";

export const competitionsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCompetitions: build.query({
      query: (params) => ({
        url: "/competitions",
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    getQuizzBySlug: build.query({
      query: ({ id }) => ({
        url: `/competitions/get-all-quiz-by-slug/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    getAllCompetitionsUser: build.query({
      query: (params) => ({
        url: "/competitions/user",
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    getCompetition: build.query({
      query: ({ id }) => ({
        url: `/competitions/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    getAllPictureByQuizId: build.query({
      query: ({ id }) => ({
        url: `/picture/get-all-by-quizId/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    getPicture: build.query({
      query: ({ id }) => ({
        url: `/picture/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    commentPicture: build.mutation({
      query: (data) => {
        return {
          url: `/comments`,
          method: "Post",
          body: data,
          flashError: true,
        };
      },
      invalidatesTags: ["comment"],
    }),
    getLeaderBoard: build.query({
      query: ({ slug }) => {
        return {
          url: `/competitions/leaderboard/${slug}`,
          method: "GET",
          flashError: true,
        };
      },
    }),
    getAllCommentByPictureId: build.query({
      query: ({ id }) => {
        return {
          url: `/comments/get-by-picture_id/${id}`,
          method: "GET",
          flashError: true,
        };
      },
      providesTags: ["comment"],
    }),
  }),
});

export const {
  useGetAllCompetitionsQuery,
  useGetCompetitionQuery,
  useGetAllCompetitionsUserQuery,
  useGetQuizzBySlugQuery,
  useGetAllPictureByQuizIdQuery,
  useGetPictureQuery,
  useCommentPictureMutation,
  useGetAllCommentByPictureIdQuery,
  useGetLeaderBoardQuery,
} = competitionsAPI;
