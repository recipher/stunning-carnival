import { Link } from "@remix-run/react";
import { Disclosure } from "@headlessui/react";

import type { IBreadcrumb } from "~/helpers/determineBreadcrumbs";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

//@ts-ignore
function Item({ item: { sys, fields }, className = "" }) {
  return sys.contentType.sys.id !== "link" ? (
    <Link
      key={fields.name}
      to={`/${fields.zone.sys.id}/${sys.id}`}
      className={className}
    >
      {fields.title}
    </Link>
  ) : (
    <a
      target="_blank"
      rel="noreferrer"
      href={fields.url}
      key={fields.name}
      className={className}
    >
      {fields.text}
    </a>
  );
}

//@ts-ignore
function SubNavigation({ links, breadcrumbs, level = 0 }) {

  const isActive = (id: string) =>
    breadcrumbs?.map((b: IBreadcrumb) => b?.id).includes(id);

  const indent = `pl-${level*3+7}`;

  return (
    <>
      {/* @ts-ignore */}
      {links.map((item) =>
        !item.fields.links ? (
          <div key={item.fields.name}>
            <Item item={item}
              className={classNames(
                isActive(item.sys.id)
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                indent,
                "group flex w-full items-center rounded-md py-2 pr-2 text-sm font-medium"
              )}
            />
          </div>
        ) : (
          <Disclosure as="div" key={item.fields.name} className="space-y-1">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    isActive(item.fields.entry.sys.id)
                      ? "bg-gray-100 text-gray-900"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex w-full items-center rounded-md py-2 pr-2 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  )}
                >
                  <svg
                    className={classNames(
                      open ? "rotate-90 text-gray-400" : "text-gray-300",
                      "mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                  <Item item={item.fields.entry} />
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1">
                  <SubNavigation links={item.fields.links} breadcrumbs={breadcrumbs} level={level+1}/>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </>
  );
}

//@ts-ignore
export default function Navigation({ navigation, breadcrumbs }) {
  if (navigation === undefined) return null;

  return (
    <nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
      <Link
        to={`/${navigation.fields.zone.sys.id}`}
        className="flex w-full items-center rounded-md bg-white py-2 pl-4 pr-2 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      >
        {navigation.fields.zone.fields.title}
      </Link>
      <SubNavigation links={navigation.fields.links} breadcrumbs={breadcrumbs} />
    </nav>
  );
}
