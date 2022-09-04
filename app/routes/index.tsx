import type { LoaderFunction } from "@remix-run/node";

import { auth } from "~/auth/auth.server";
import { getZone } from "~/models/zone.server";

export const loader: LoaderFunction = async ({ request }) => {
  const zone = await getZone();

  await auth.isAuthenticated(request, {
    successRedirect: `/${zone.sys.id}`,
  });

  await auth.authenticate("auth0", request);
};
