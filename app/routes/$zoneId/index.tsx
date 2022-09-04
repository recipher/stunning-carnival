import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getNavigation } from "~/models/navigation.server";

const firstEntry = (link: any) => {
  const first =
    link?.sys.contentType.sys.id === "navigation" ? link.fields.entry : link;
  return { entryId: first.sys.id, contentType: first.sys.contentType.sys.id };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { zoneId } = params;
  if (!zoneId) return redirect("/error");

  const navigation = await getNavigation(zoneId);
  if (!navigation) return redirect("/error");

  const { entryId, contentType } = firstEntry(navigation.fields.links?.at(0));
  if (!entryId) return redirect("/error");

  return redirect(`/${zoneId}/${contentType}/${entryId}`);
};
