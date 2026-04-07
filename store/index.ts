import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";
import favoritesReducer from "./favoritesSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    favorites: favoritesReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
