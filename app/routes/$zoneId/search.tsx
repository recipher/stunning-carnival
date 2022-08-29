import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

import { search } from "~/models/article.server";
import ErrorMessage from "~/components/error";

type LoaderData = {
  q: string | null;
  entries: NonNullable<Awaited<ReturnType<typeof search>>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { zoneId } = params;

  if (!zoneId) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const entries = await search(q as string);

  return json<LoaderData>({ q, entries });
};

export default function EntryPage() {
  const { q, entries } = useLoaderData() as LoaderData;

  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          Search Results for <em>{q}</em>
        </h1>
      </div>
      {entries?.map((entry) => (
        <div className="prose px-4 pb-7 sm:px-6 md:px-0" key={entry.sys.id}>
          <h3 className="text-2xl font-semibold text-gray-900">
            <Link to={`/${entry.fields.zone?.sys.id}/${entry.sys.id}`}>
              {entry.fields.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <ErrorMessage message="Server error" details={error.message} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorMessage message="Zone not found" />;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
