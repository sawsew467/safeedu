"use client";

import { baseApi } from "@/store/baseQuery";

export const QuestionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuestion: build.query({
      query: (params) => ({
        url: "/questions",
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    getQuizz: build.query({
      query: ({ id }) => ({
        url: `/quiz/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    getQuestion: build.query({
      query: ({ id }) => ({
        url: `/questions/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    getQuizResult: build.query({
      query: ({ id }) => ({
        url: `/quiz-result/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    getQuestionByQuizzId: build.query({
      query: ({ id }) => ({
        url: `/questions/get-all-by-quizId/${id}`,
        method: "GET",
        flashError: true,
      }),
    }),
    submissionQuestion: build.mutation({
      query: (data) => {
        return {
          url: `/submission`,
          method: "POST",
          body: data,
          flashError: true,
        };
      },
    }),
  }),
});

export const {
  useGetAllQuestionQuery,
  useGetQuestionQuery,
  useGetQuestionByQuizzIdQuery,
  useSubmissionQuestionMutation,
  useGetQuizResultQuery,
  useGetQuizzQuery,
} = QuestionApi;
