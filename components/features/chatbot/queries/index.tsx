import { baseApi } from "@/store/baseQuery";

const chatbotQueries = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCourses: build.query<any, void>({
      query: () => "/courses",
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCoursesQuery } = chatbotQueries;
