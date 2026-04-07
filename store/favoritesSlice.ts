import { Article } from "@/types/article";
import { load, save } from "@/utils/storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "favorites";

type FavoritesState = {
  items: Article[];
  hydrated: boolean;
};

const initialState: FavoritesState = {
  items: [],
  hydrated: false,
};

export const hydrateFavorites = createAsyncThunk(
  "favorites/hydrate",
  async () => {
    return await load<Article[]>(STORAGE_KEY, []);
  },
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      save(STORAGE_KEY, state.items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateFavorites.fulfilled, (state, action) => {
      state.items = action.payload;
      state.hydrated = true;
    });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
