import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { notFound } from "remix-utils";

import { getNavigation } from "~/models/navigation.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { zoneId } = params;
  if (!zoneId) throw notFound("Not Found");

  const navigation = await getNavigation(zoneId);
  if (!navigation) throw notFound("Not Found");

  const entryId = navigation.fields.links?.at(0)?.sys.id;
  if (!entryId) throw notFound("Not Found");
  return redirect(`/${zoneId}/${entryId}`);
};
