import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { Entry } from "contentful";
import type { IArticleFields } from "../../@types/generated/contentful";

export async function getArticle(
  articleId: string
): Promise<Entry<IArticleFields>> {
  const client = contentful();
  const entries = await client.getEntries<IArticleFields>({
    content_type: "article",
    "sys.id": articleId,
    limit: 1,
    include: 10,
  });
  const [entry] = resolve(entries);
  return entry;
}
