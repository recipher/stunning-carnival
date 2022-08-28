import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { notFound } from "remix-utils";
import type { Document } from "@contentful/rich-text-types";

import Article from "~/components/article";
import ErrorMessage from "~/components/error";
import Breadcrumbs from "~/components/breadcrumbs";

import { getArticle } from "~/models/article.server";
import { getNavigation } from "~/models/navigation.server";
import determineBreadcrumbs from '~/helpers/determineBreadcrumbs';

type LoaderData = {
  navigation: NonNullable<Awaited<ReturnType<typeof getNavigation>>>;
  entry: NonNullable<Awaited<ReturnType<typeof getArticle>>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { entryId, zoneId } = params;
  if (!zoneId || !entryId) throw notFound("Not Found");

  const navigation = await getNavigation(zoneId);
  if (!navigation) throw notFound("Not Found");
  
  const entry = await getArticle(entryId);
  if (!entry) throw notFound("Not Found");

  return json<LoaderData>({ navigation, entry });
};

export default function EntryPage() {
  const { entry, navigation } = useLoaderData() as LoaderData;
  const { title, contents, zone } = entry.fields;

  const { zoneId, entryId } = useParams();

  const breadcrumbs = determineBreadcrumbs(navigation, entryId as string);

  return (
    <>
      <Breadcrumbs zone={zone} breadcrumbs={breadcrumbs} />
      <Article
        title={title}
        document={contents as Document}
        zoneId={zoneId as string}
      />
    </>
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
