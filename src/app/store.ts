import { configureStore } from "@reduxjs/toolkit";
import teleComServicesReducer from "features/teleComServicesSlice";
import yearsReducer from "features/yearsSlice";

export const store = configureStore({
  reducer: {
    teleComServices: teleComServicesReducer,
    years: yearsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
