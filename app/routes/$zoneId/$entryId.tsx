import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const { zoneId, entryId } = params;
  return redirect(`/${zoneId}/article/${entryId}`);
};
