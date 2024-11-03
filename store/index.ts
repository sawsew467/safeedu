import { configureStore } from "@reduxjs/toolkit";

import auth from "@/components/features/chatbot/slices";
import { cozeApi } from "@/components/features/chatbot/queries/cozeQueries";
import { baseApi } from "./baseQuery";

export const store = configureStore({
  reducer: {
    [cozeApi.reducerPath]: cozeApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    auth: auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(cozeApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
