import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { IZone } from "../../@types/generated/contentful";

export async function getZone(): Promise<IZone> {
  const client = contentful();
  const entries = await client.getEntries<IZone>({
    content_type: "zone",
    limit: 1,
  });
  console.log(entries);
  return resolve(entries).at(0);
}
