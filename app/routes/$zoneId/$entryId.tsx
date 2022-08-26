import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { Document } from "@contentful/rich-text-types";

import Article from "~/components/article";

import { getArticle } from "~/models/article.server";

type LoaderData = {
  entry: NonNullable<Awaited<ReturnType<typeof getArticle>>>;
  zoneId: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { entryId, zoneId } = params;
  if (!entryId || !zoneId) throw new Response("Not Found", { status: 404 });

  const entry = await getArticle(entryId);

  if (!entry) throw new Response("Not Found", { status: 404 });

  return json<LoaderData>({ entry, zoneId });
};

export default function EntryPage() {
  const { entry, zoneId } = useLoaderData() as LoaderData;
  const { title, contents } = entry.fields;

  return (
    <Article title={title} document={contents as Document} zoneId={zoneId} />
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
