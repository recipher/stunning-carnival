import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { destroySession, getSession } from "~/auth/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/auth/denied", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
