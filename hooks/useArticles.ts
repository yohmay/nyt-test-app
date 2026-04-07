import { TabType } from "@/services/articlesService";
import { AppDispatch, RootState } from "@/store";
import { fetchArticlesByType, resetTabStatus } from "@/store/articlesSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useArticles = (type: TabType) => {
  const dispatch = useDispatch<AppDispatch>();
  const tabState = useSelector((state: RootState) => state.articles[type]);
  const articles = tabState.data;
  const status = tabState.status;
  const error = tabState.error;

  useEffect(() => {
    dispatch(fetchArticlesByType(type));
  }, [type, dispatch]);

  const retry = useCallback(() => {
    dispatch(resetTabStatus(type));
    dispatch(fetchArticlesByType(type));
  }, [type, dispatch]);

  return {
    articles,
    isLoading: status === "loading",
    isError: status === "error",
    error,
    retry,
  };
};
