import { getMostPopularArticles, TabType } from "@/services/articlesService";
import { Article } from "@/types/article";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type TabState = {
  data: Article[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

type ArticlesState = {
  viewed: TabState;
  shared: TabState;
  emailed: TabState;
};

const emptyTab = (): TabState => ({
  data: [],
  status: "idle",
  error: null,
});

const initialState: ArticlesState = {
  viewed: emptyTab(),
  shared: emptyTab(),
  emailed: emptyTab(),
};

export const fetchArticlesByType = createAsyncThunk(
  "articles/fetchByType",
  async (type: TabType) => {
    const data = await getMostPopularArticles(type);
    return { type, data };
  },
  {
    condition: (type, { getState }) => {
      const state = getState() as RootState;
      const status = state.articles[type].status;
      return status === "idle" || status === "error";
    },
  },
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetTabStatus: (state, action: { payload: TabType }) => {
      state[action.payload].status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByType.pending, (state, action) => {
        state[action.meta.arg].status = "loading";
        state[action.meta.arg].error = null;
      })
      .addCase(fetchArticlesByType.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state[type].status = "success";
        state[type].data = data;
      })
      .addCase(fetchArticlesByType.rejected, (state, action) => {
        state[action.meta.arg].status = "error";
        state[action.meta.arg].error = "Failed to load articles.";
      });
  },
});

export const { resetTabStatus } = articlesSlice.actions;
export default articlesSlice.reducer;
