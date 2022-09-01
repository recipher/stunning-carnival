import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { enqueueRefreshNavigation } from "~/routes/queues/refreshNavigation";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { zoneId } = params;
  if (!zoneId) throw new Response("Not Found", { status: 404 });

  enqueueRefreshNavigation({ zoneId });
  return redirect(`/${zoneId}`);
}