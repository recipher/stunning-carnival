import { MailIcon, PhoneIcon } from '@heroicons/react/outline';

import Photo from "./photo";
import Contact from "../contact";

const socials = [
  { name: "linkedIn", url: "https://www.linkedin.com/company/safeguard-globl" },
  { name: "email", url: "email@email.com" },
  { name: "phone", url: "123-123-123" },
];

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
      <div className="flex justify-center space-x-6 md:order-2">
        {socials.map((social) => <Contact key={social.name} name={social.name} value={social.url} />)}
      </div>
    </>
  );
}