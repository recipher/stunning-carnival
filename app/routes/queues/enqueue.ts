import type { ActionFunction } from "@remix-run/node";

const { BASE_URL } = process.env;

export const action: ActionFunction = async ({ request }) => {
  const { route, payload } = await request.json();

  fetch(`${BASE_URL}${route}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
  })
    .then((response) => {
      if (!response.ok)
        return console.error(`Error sending queued request: ${route}`);
    })
    .catch((error) => console.error("error", error));

  return null;
};

type EnqueueParams = {
  route: string;
  payload: unknown;
};

export function enqueue(params: EnqueueParams) {
  fetch(`${BASE_URL}/queues/enqueue`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
  });
}
