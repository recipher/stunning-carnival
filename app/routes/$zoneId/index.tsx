import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import { notFound } from "remix-utils";

import ErrorPage from "~/components/500";

import { getNavigation } from "~/models/navigation.server";

const firstEntry = (link: any) =>
  link?.sys.contentType.sys.id === "navigation"
    ? link?.fields.entry.sys.id
    : link?.sys.id;

export const loader: LoaderFunction = async ({ params }) => {
  const { zoneId } = params;
  if (!zoneId) return redirect("/error");

  const navigation = await getNavigation(zoneId);
  if (!navigation) return redirect("/error");

  const entryId = firstEntry(navigation.fields.links?.at(0));
  if (!entryId) return redirect("/error");

  return redirect(`/${zoneId}/${entryId}`);
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <ErrorPage message={error.message} statusCode={500} />
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorPage message="Article not found" statusCode={404} />;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}