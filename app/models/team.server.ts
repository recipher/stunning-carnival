import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type { ITeam } from "../../@types/generated/contentful";

export async function getTeam(teamId: string): Promise<ITeam> {
  const client = contentful();
  const entries = await client.getEntries<ITeam>({
    content_type: "team",
    "sys.id": teamId,
    limit: 1,
    include: 10,
  });
  const [entry] = resolve(entries);
  return entry;
}
