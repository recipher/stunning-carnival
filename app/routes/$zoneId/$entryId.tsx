import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { useRouteData, serverError, notFound } from "remix-utils";
import type { Document } from "@contentful/rich-text-types";
import type { LoaderData as ZoneLoaderData } from "~/routes/$zoneId";

import Article from "~/components/article";
import ErrorMessage from "~/components/error";

import { getArticle } from "~/models/article.server";

type LoaderData = {
  entry: NonNullable<Awaited<ReturnType<typeof getArticle>>>;
  zoneId: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { entryId, zoneId } = params;
  if (!zoneId || !entryId) throw notFound("Not Found");

  const entry = await getArticle(entryId);

  if (!entry) throw notFound("Not Found");

  return json<LoaderData>({ entry, zoneId });
};

export default function EntryPage() {
  const { entry } = useLoaderData() as LoaderData;
  const { title, contents, zone } = entry.fields;

  const zoneData: ZoneLoaderData | undefined = useRouteData("routes/$zoneId");
  if (zoneData === undefined) throw serverError("Zone not available");

  const { breadcrumbs } = zoneData;

  console.log(breadcrumbs);

  return (
    <Article
      title={title}
      document={contents as Document}
      zoneId={zone?.sys.id as string}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <ErrorMessage message="Server error" details={error.message} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorMessage message="Article not found" />;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
