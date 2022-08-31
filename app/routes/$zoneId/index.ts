import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { notFound } from "remix-utils";

import { getNavigation } from "~/models/navigation.server";

const firstEntry = (link: any) =>
  link?.sys.contentType.sys.id === "navigation"
    ? link?.fields.entry.sys.id
    : link?.sys.id;

export const loader: LoaderFunction = async ({ params }) => {
  const { zoneId } = params;
  if (!zoneId) throw notFound("Not Found");

  const navigation = await getNavigation(zoneId);
  if (!navigation) throw notFound("Not Found");

  const entryId = firstEntry(navigation.fields.links?.at(0));
  if (!entryId) throw notFound("Not Found");
  return redirect(`/${zoneId}/${entryId}`);
};
