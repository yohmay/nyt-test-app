import { Article, mapArticle } from "@/types/article";
import { nytHttpClient } from "./nytHttpClient";

const API_KEY = process.env.EXPO_PUBLIC_NYT_API_KEY;

export type TabType = "viewed" | "shared" | "emailed";

export const getMostPopularArticles = async (
  type: TabType,
): Promise<Article[]> => {
  const res = await nytHttpClient.get(`/mostpopular/v2/${type}/7.json`, {
    params: { "api-key": API_KEY },
  });
  return res.data.results.map(mapArticle);
};

export const searchArticles = async (query: string): Promise<Article[]> => {
  const res = await nytHttpClient.get(`/search/v2/articlesearch.json`, {
    params: { q: query, "api-key": API_KEY },
  });
  return res.data.response.docs.map(mapArticle);
};
