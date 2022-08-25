import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { Entry } from "contentful";
import type { IArticleFields } from "../../@types/generated/contentful";

export async function getArticle(
  articleId: string
): Promise<Entry<IArticleFields>> {
  const client = contentful();
  const entry = await client.getEntries<IArticleFields>({
    content_type: "article",
    "sys.id": articleId,
    limit: 1,
    include: 10,
  });
  return resolve(entry).at(0);
}
