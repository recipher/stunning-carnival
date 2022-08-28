import { Fragment, useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  MenuAlt2Icon,
  XIcon,
  //@ts-ignore
} from "@heroicons/react/outline";
import { notFound } from "remix-utils";

import Search from "~/components/search";
import Navigation from "~/components/navigation";
import ErrorMessage from "~/components/error";

import { getNavigation } from "~/models/navigation.server";
import determineBreadcrumbs from "~/helpers/determineBreadcrumbs";

export type LoaderData = {
  navigation: NonNullable<Awaited<ReturnType<typeof getNavigation>>>;
  q: string | null;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { zoneId, entryId } = params;
  if (!zoneId) throw notFound("Not Found");

  const navigation = await getNavigation(zoneId);
  if (!navigation) throw notFound("Not Found");

  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!entryId) {
    const firstEntryId = navigation.fields.links?.at(0)?.sys.id;
    if (!firstEntryId) throw notFound("Not Found");
    return redirect(`/${zoneId}/${firstEntryId}`);
  }

  return json<LoaderData>({ navigation, q });
};

export default function ZonePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { navigation, q } = useLoaderData() as LoaderData;
  const { entryId, zoneId } = useParams();

  const breadcrumbs = determineBreadcrumbs(navigation, entryId as string);

  console.log('zone', breadcrumbs);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-6">
                  <img
                    className="h-8 w-auto"
                    src="/_static/sgg.png"
                    alt="Knowledge Zone"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <Navigation
                    navigation={navigation}
                    breadcrumbs={breadcrumbs}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
          <div className="flex flex-shrink-0 items-center px-6">
            <img
              className="h-8 w-auto"
              src="/_static/sgg.png"
              alt="Knowledge Zone"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <Navigation navigation={navigation} breadcrumbs={breadcrumbs} />
          </div>
        </div>
      </div>

      <div className="md:pl-64">
        <div className="mx-8 flex max-w-4xl flex-col md:px-8 xl:px-0">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Search zoneId={zoneId} q={q} />
          </div>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
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
