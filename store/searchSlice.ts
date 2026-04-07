import { searchArticles } from "@/services/articlesService";
import { Article } from "@/types/article";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SearchState = {
  results: Article[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  lastQuery: string;
};

const initialState: SearchState = {
  results: [],
  status: "idle",
  error: null,
  lastQuery: "",
};

export const fetchSearch = createAsyncThunk(
  "search/fetch",
  async (query: string) => {
    const results = await searchArticles(query);
    return { results, query };
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
      state.lastQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state, action) => {
        if (state.lastQuery === action.meta.arg) return;
        state.status = "loading";
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = "success";
        state.results = action.payload.results;
        state.lastQuery = action.payload.query;
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.status = "error";
        state.error = "Search failed. Please try again.";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
