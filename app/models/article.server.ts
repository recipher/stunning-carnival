import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { IArticle } from "../../@types/generated/contentful";

export async function getArticle(articleId: string): Promise<IArticle> {
  const client = contentful();
  const entries = await client.getEntries<IArticle>({
    content_type: "article",
    "sys.id": articleId,
    limit: 1,
    include: 1,
  });
  const [entry] = resolve(entries);
  return entry;
}

export async function search(query: string): Promise<Array<IArticle>> {
  const client = contentful();
  const entries = await client.getEntries<IArticle>({
    content_type: "article",
    query,
    limit: 25,
    include: 10,
  });
  return resolve(entries);
}
