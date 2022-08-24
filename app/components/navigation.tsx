import { Disclosure } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
};

//@ts-ignore
export default function Navigation({ navigation }) {
  return (
    <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
      { /* @ts-ignore */ }
      {navigation.map((item) =>
        !item.children ? (
          <div key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              {item.name}
            </a>
          </div>
        ) : (
          <Disclosure as="div" key={item.name} className="space-y-1">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  )}
                >
                  <svg
                    className={classNames(
                      open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                      'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                  {item.name}
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1">
                  { /* @ts-ignore */ }
                  {item.children.map((subItem) => (
                    <Disclosure.Button
                      key={subItem.name}
                      as="a"
                      href={subItem.href}
                      className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      {subItem.name}
                    </Disclosure.Button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </nav>
  );
};
