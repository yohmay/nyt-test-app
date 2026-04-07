export type Article = {
  id: number;
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  url: string;
  section: string;
};

function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function resolveId(item: any): number {
  if (typeof item.id === "number") return item.id;
  if (typeof item.id === "string") return hashStringToNumber(item.id);
  if (typeof item._id === "string") return hashStringToNumber(item._id);
  return 0;
}

function resolveByline(item: any): string {
  if (typeof item.byline === "string") return item.byline;
  if (typeof item.byline?.original === "string") return item.byline.original;
  return "";
}

export const mapArticle = (item: any): Article => ({
  id: resolveId(item),
  title: item.title ?? item.headline?.main ?? "",
  abstract: item.abstract ?? item.snippet ?? "",
  byline: resolveByline(item),
  published_date: item.published_date ?? item.pub_date ?? "",
  url: item.url ?? item.web_url ?? "",
  section: item.section ?? item.section_name ?? "",
});
