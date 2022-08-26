import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { Entry } from "contentful";
import type { INavigationFields } from "../../@types/generated/contentful";

const DEFAULT_ZONE = "knowledge-zone";

export async function getNavigation(
  zoneId: string | undefined
): Promise<Entry<INavigationFields>> {
  const client = contentful();
  let query: any = {
    content_type: "navigation",
    limit: 1,
    include: 10,
  };

  query =
    zoneId === undefined
      ? { ...query, "fields.zone.fields.name": DEFAULT_ZONE }
      : { ...query, "fields.zone.sys.id": zoneId };

  const entries = await client.getEntries<INavigationFields>(query);
  const [entry] = resolve(entries);
  return entry;
}
