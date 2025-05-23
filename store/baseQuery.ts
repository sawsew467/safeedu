import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import constants from "@/settings/constants";
import {
  setAccessToken,
  setRefreshToken,
} from "@/components/features/auth/slices";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.API_SERVER,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as any).auth.access_token;
    headers.set("Content-Type", "application/json");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refresh_token = (api!.getState() as any)?.auth.refresh_token;

    const refreshResult = await fetch(
      `${constants.API_SERVER}/auth/get-access-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    const newAccessToken = refreshResult?.data?.access_token;
    const newRefreshToken = refreshResult?.data?.refresh_token;

    if (newAccessToken) {
      api.dispatch(setAccessToken(newAccessToken));
      api.dispatch(setRefreshToken(newRefreshToken));

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
      if (result?.error?.status === 401) {
        api.dispatch(setAccessToken(null));
        api.dispatch(setRefreshToken(null));
      }
    } else {
      api.dispatch(setAccessToken(null));
      api.dispatch(setRefreshToken(null));

      return { error: { status: 401, data: "Unauthorized" } };
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["comment", "picture", "quizResult", "students", "citizens"],
});
