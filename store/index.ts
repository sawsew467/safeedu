import { configureStore } from "@reduxjs/toolkit";

import auth from "@/components/features/chatbot/slices";
import { cozeApi } from "@/components/features/chatbot/queries/cozeQueries";

export const store = configureStore({
  reducer: {
    auth: auth,
    [cozeApi.reducerPath]: cozeApi.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
