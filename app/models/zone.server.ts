import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { Entry } from "contentful";
import type { IZoneFields } from "../../@types/generated/contentful";

export async function getZone(): Promise<Entry<IZoneFields>> {
  const client = contentful();
  const entries = await client.getEntries<IZoneFields>({
    content_type: "zone",
    limit: 1,
  });
  return resolve(entries).at(0);
}
