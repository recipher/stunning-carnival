import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import ErrorMessage from "~/components/error";

type LoaderData = {
  q: string | null;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { zoneId } = params;

  if (!zoneId) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  return json<LoaderData>({ q });
};

export default function EntryPage() {
  const { q } = useLoaderData() as LoaderData;

  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          Search Results for <em>{q}</em>
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">{q}</div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <ErrorMessage
      message="An unexpected error occurred"
      details={error.message}
    />
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorMessage message="Zone not found" />;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
