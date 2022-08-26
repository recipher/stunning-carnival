import { Link } from "@remix-run/react";
import { Disclosure } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

//@ts-ignore
function Item({ item, zoneId, className }) {
  return item.sys.contentType.sys.id !== "link" ? (
    <Link
      key={item.fields.name}
      to={`/${zoneId}/${item.sys.id}`}
      className={className}
    >
      {item.fields.title}
    </Link>
  ) : (
    <a
      target="_blank"
      rel="noreferrer"
      href={item.fields.url}
      key={item.fields.name}
      className={className}
    >
      {item.fields.text}
    </a>
  );
}

//@ts-ignore
export default function Navigation({ navigation, zoneId }) {
  return (
    <nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
      {/* @ts-ignore */}
      {navigation.fields.links.map((item) =>
        !item.fields.links ? (
          <div key={item.fields.name}>
            <Link
              to={`/${zoneId}/${item.sys.id}`}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex w-full items-center rounded-md py-2 pl-7 pr-2 text-sm font-medium"
              )}
            >
              {item.fields.title}
            </Link>
          </div>
        ) : (
          <Disclosure as="div" key={item.fields.name} className="space-y-1">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    true
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
                  {item.fields.entry.fields.title}
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1" static>
                  {/* @ts-ignore */}
                  {item.fields.links.map((subItem) => (
                    <Item
                      key={subItem.fields.name}
                      item={subItem}
                      zoneId={zoneId}
                      className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    />
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </nav>
  );
}
