import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { INavigation } from "../../@types/generated/contentful";

import { DEFAULT_ZONE } from "./zone.server";

export async function getNavigation(
  zoneId: string | undefined
): Promise<INavigation> {
  const client = contentful();
  let query: any = {
    content_type: "navigation",
    limit: 1,
    include: 1,
    select: "sys.id,fields.entry,fields.links,fields.zone"
  };

  query =
    zoneId === undefined
      ? { ...query, "fields.zone.fields.name": DEFAULT_ZONE }
      : { ...query, "fields.zone.sys.id": zoneId };

  const entries = await client.getEntries<INavigation>(query);
  const [entry] = resolve(entries);

  console.log(JSON.stringify(entry, null, 2));

  return entry;
}
