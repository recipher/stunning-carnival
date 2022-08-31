import type { ActionFunction } from "@remix-run/node";

const BASE_URL = "http://localhost:3000";

export const action: ActionFunction = async ({ request }) => {
	const { route, payload } = await request.json();

	fetch(`${BASE_URL}${route}`, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: { "Content-Type": "application/json" },
		credentials: "omit",
	})
    .then(response => {
		  if (!response.ok)
        return console.log("something wrong happened"); // TODO: implement retry mechanic
		})
    .catch(error => console.error("error", error));

	return null;
}

type EnqueueParams = {
	route: string;
	payload: unknown;
}

export function enqueue(params: EnqueueParams) {
	fetch(`${BASE_URL}/queues/enqueue`, {
		method: "POST",
		body: JSON.stringify(params),
		headers: { "Content-Type": "application/json" },
		credentials: "omit",
	});
}