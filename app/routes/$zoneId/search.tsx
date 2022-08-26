import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { Document } from "@contentful/rich-text-types";

type LoaderData = {
  q: string | null;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { zoneId } = params;

  if (!zoneId) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  return json<LoaderData>({ q });
};

export default function EntryPage() {
  const { q } = useLoaderData() as LoaderData;

  return (
    <div>{q}</div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Entry not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
