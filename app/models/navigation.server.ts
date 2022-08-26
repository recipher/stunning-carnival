import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { Entry } from "contentful";
import type { INavigationFields } from "../../@types/generated/contentful";

export async function getNavigation(
  zoneId: string
): Promise<Entry<INavigationFields>> {
  const client = contentful();
  const entries = await client.getEntries<INavigationFields>({
    content_type: "navigation",
    "fields.zone.sys.id": zoneId,
    limit: 1,
    include: 5,
  });
  const [entry] = resolve(entries);
  return entry;
}
