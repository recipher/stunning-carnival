import type { ActionFunction } from "@remix-run/node";

import { refreshNavigation } from "~/models/navigation.server";
import { enqueue } from "./enqueue";

type Payload = {
  zoneId: string;
};

export const action: ActionFunction = async ({ request }) => {
  const { zoneId } = await request.json();
  if (zoneId) await refreshNavigation(zoneId);

  return null;
};

export function enqueueRefreshNavigation(payload: Payload) {
  enqueue({ route: "/queues/refreshNavigation", payload });
}
