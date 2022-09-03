import { useEffect, useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { notFound } from "remix-utils";

import Chart from "~/components/team/chart";
import List from "~/components/team/list";
import ErrorMessage from "~/components/error";
import Breadcrumbs from "~/components/breadcrumbs";

import { getTeam } from "~/models/team.server";
import determineBreadcrumbs from "~/helpers/determineBreadcrumbs";
import type { IBreadcrumb } from "~/helpers/determineBreadcrumbs";
import useNavigation from "~/hooks/useNavigation";

import { requireProfile } from "~/auth/auth.server";
import type { Profile } from "~/auth/auth.server";

export const meta: MetaFunction = ({ data, parentsData }) => {
  const zone = parentsData["routes/$zoneId"].zone?.fields.title;
  const entry = data.entry?.fields.title;
  return { title: `Safeguard Global | ${zone} | ${entry}` };
};

type LoaderData = {
  view: string | null;
  entry: NonNullable<Awaited<ReturnType<typeof getTeam>>>;
  profile: Profile | undefined;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { entryId, zoneId } = params;
  if (!zoneId || !entryId) throw notFound("Not Found");

  const profile = undefined; //await requireProfile(request);

  const entry = await getTeam(entryId);
  if (!entry) throw notFound("Not Found");

  const url = new URL(request.url);
  const view = url.searchParams.get('view');

  return json<LoaderData>({ entry, profile, view });
};

const Views = { "chart": Chart, "list": List };

export default function TeamPage() {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<IBreadcrumb>>([]);

  const { entry, view } = useLoaderData() as LoaderData;
  const { title, positions, zone } = entry.fields;

  const { zoneId, entryId } = useParams();

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation !== undefined && entryId !== undefined)
      setBreadcrumbs(determineBreadcrumbs(navigation, entryId));
  }, [entryId, navigation]);

  //@ts-ignore
  const View= view ? Views[view] || Chart : Chart;

  return (
    <>
      <Breadcrumbs zone={zone} breadcrumbs={breadcrumbs} />
      <div className="hidden sm:block">
        <View title={title as string} positions={positions} zoneId={zoneId as string} />
      </div>
      <div className="block sm:hidden">
        <List title={title as string} positions={positions} zoneId={zoneId as string} />
      </div>
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
