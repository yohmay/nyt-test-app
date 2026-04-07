import { AppDispatch, RootState } from "@/store";
import { clearSearch, fetchSearch } from "@/store/searchSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DEBOUNCE_MS = 400;
const MIN_CHARS = 3;

export const useSearch = (query: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, status, error } = useSelector(
    (state: RootState) => state.search,
  );

  useEffect(() => {
    if (query.length < MIN_CHARS) {
      dispatch(clearSearch());
      return;
    }
    const timer = setTimeout(() => {
      dispatch(fetchSearch(query));
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query, dispatch]);

  return {
    results,
    isLoading: status === "loading",
    isError: status === "error",
    error,
  };
};
