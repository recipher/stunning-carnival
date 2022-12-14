import { Link } from "@remix-run/react";
import { Disclosure, Transition } from "@headlessui/react";
import type { IBreadcrumb } from "~/helpers/determineBreadcrumbs";

const KNOWLEDGE_ZONE = "Knowledge Zone";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

//@ts-ignore
function Item({ item: { sys, fields }, style = {}, onSelect, className = "" }) {
  return sys.contentType?.sys.id !== "link" ? (
    <Link
      onClick={onSelect}
      key={sys.id}
      to={`/${fields.zone.sys.id}/${sys.contentType.sys.id}/${sys.id}`}
      className={className}
      style={style}
    >
      {fields.title}
    </Link>
  ) : (
    <a
      target="_blank"
      rel="noreferrer"
      href={fields.url}
      key={sys.id}
      className={className}
      style={style}
    >
      {fields.title}
    </a>
  );
}

// @ts-ignore
function SubNavigation({ links, breadcrumbs, onSelect, level }) {
  const isActive = (id: string) =>
    breadcrumbs?.map((b: IBreadcrumb) => b?.id).includes(id);

  return (
    <>
      {links
        .filter((item: any) => item && item.fields) // hide unpublished
        .map((item: any) =>
          !item.fields.links ? (
            <div key={item.fields.name}>
              <Item
                onSelect={onSelect}
                item={item}
                style={{ paddingLeft: `${level * 0.75 + 1.75}rem` }}
                className={classNames(
                  isActive(item.sys.id)
                    ? "bg-gray-100 text-gray-900"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex w-full items-center rounded-md py-2 pr-2 text-sm font-medium"
                )}
              />
            </div>
          ) : (
            <Disclosure
              as="div"
              className="space-y-1"
              defaultOpen={isActive(item.fields.entry.sys.id)}
              key={`${item.fields.name}-${isActive(item.fields.entry.sys.id)}`}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    style={{ paddingLeft: `${level * 0.75}rem` }}
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
                    <Item onSelect={onSelect} item={item.fields.entry} />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="space-y-1">
                      <SubNavigation
                        onSelect={onSelect}
                        links={item.fields.links}
                        breadcrumbs={breadcrumbs}
                        level={level + 1}
                      />
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          )
        )}
    </>
  );
}

//@ts-ignore
export default function Navigation({ navigation, breadcrumbs, onSelect }) {
  if (navigation === undefined) return null;

  const TopLink = ({
    to,
    title,
    level = 0,
  }: {
    to: string;
    title: string;
    level: Number;
  }) => (
    <Link
      onClick={onSelect}
      to={to}
      style={{ paddingLeft: `${(level as number) * 0.75 + 1}rem` }}
      className="flex w-full items-center rounded-md bg-white py-1 pr-2 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      {title}
    </Link>
  );

  const {
    fields: { zone },
  } = navigation;
  const showDefaultZone = zone.fields.name !== "knowledge-zone";

  return (
    <nav className="flex-1 space-y-1 bg-white px-2 pb-10" aria-label="Sidebar">
      {showDefaultZone && <TopLink to="/" title={KNOWLEDGE_ZONE} level={0} />}
      <TopLink
        to={`/${zone.sys.id}`}
        title={zone.fields.title}
        level={new Number(showDefaultZone)}
      />
      <SubNavigation
        onSelect={onSelect}
        links={navigation.fields.links}
        breadcrumbs={breadcrumbs}
        level={new Number(showDefaultZone)}
      />
    </nav>
  );
}
