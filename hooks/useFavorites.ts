import { AppDispatch, RootState } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Article } from "@/types/article";
import { useDispatch, useSelector } from "react-redux";

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = (id: number) =>
    favorites.some((item: Article) => item.id === id);

  const toggle = (article: Article) => {
    dispatch(toggleFavorite(article));
  };

  return { favorites, toggle, isFavorite };
};
