import { configureStore } from "@reduxjs/toolkit";

import chatbot from "@/components/features/chatbot/slices";
import auth from "@/components/features/auth/slices";
import { cozeApi } from "@/components/features/chatbot/queries/cozeQueries";
import { baseApi } from "./baseQuery";
import { rtkQueryErrorLogger } from "./midleware";
import { UploadApi } from "@/services/upload/api.upload";

export const store = configureStore({
  reducer: {
    [cozeApi.reducerPath]: cozeApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [UploadApi.reducerPath]: UploadApi.reducer,
    chatbot: chatbot,
    auth: auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(cozeApi.middleware)
      .concat(UploadApi.middleware)
      .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
