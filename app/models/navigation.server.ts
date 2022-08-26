import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { Entry } from "contentful";
import type { INavigationFields } from "../../@types/generated/contentful";

export async function getNavigation(
  name: string
): Promise<Entry<INavigationFields>> {
  const client = contentful();
  const entry = await client.getEntries<INavigationFields>({
    content_type: "navigation",
    "fields.name": name,
    limit: 1,
    include: 10,
  });
  return resolve(entry).at(0);
}
