import { MailIcon, PhoneIcon } from '@heroicons/react/outline';

import Photo from "./photo";

//@ts-ignore
export default function Card({ fields: { name: position, person: { sys: { id }, fields: { name, photo }} }}) {
  return (
    <>
      <div className="flex flex-1 flex-col p-8 items-center">
        <Photo name={name} photo={undefined} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">{position}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Admin
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${name}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Email</span>
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${name}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}