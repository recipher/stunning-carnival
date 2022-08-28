import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { IArticle } from "../../@types/generated/contentful";

export async function getArticle(articleId: string): Promise<IArticle> {
  const client = contentful();
  const entries = await client.getEntries<IArticle>({
    content_type: "article",
    "sys.id": articleId,
    limit: 1,
    include: 10,
  });
  const [entry] = resolve(entries);
  return entry;
}
