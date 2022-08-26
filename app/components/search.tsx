//@ts-ignore
import { SearchIcon } from "@heroicons/react/solid";

//@ts-ignore
export default function Search({ zoneId, q }) {
  return (
    <div className="flex flex-1 justify-between px-4 md:px-0">
      <div className="flex flex-1">
        <form className="flex w-full md:ml-0" action={`/${zoneId}/search`} method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
          </div>
        </form>
      </div>
    </div>
  );
}