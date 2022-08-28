import { Link } from "@remix-run/react";
import { ChevronRightIcon } from '@heroicons/react/outline';

// @ts-ignore
export default function Breadcrumbs({ zone, breadcrumbs }) {
  return (
    <nav className="flex py-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <Link to={`/${zone.sys.id}`} className="text-gray-400 hover:text-gray-500">
            {zone.fields.title}
          </Link>
        </li>
        {breadcrumbs?.map((breadcrumb: any) => (
          <li key={breadcrumb?.id}>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <Link
                to={`/${zone.sys.id}/${breadcrumb?.id}`}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {breadcrumb?.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
