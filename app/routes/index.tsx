import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getZone } from "~/models/zone.server";

export const loader: LoaderFunction = async (_) => {
  const zone = await getZone();
  throw redirect(`/${zone.sys.id}`, 302);
};

export default function IndexPage() {
  return <div>Zone not found</div>;
}
