import type { IContact } from '../../../@types/generated/contentful';

import Photo from "./photo";
import Contact from "../contact";

//@ts-ignore
export default function Card({ fields: { title, person: { fields: { name, photo, contacts }}}}) {
  return (
    <div className="col-span-1 flex flex-col py-4 bg-white text-center border border-gray-200">
      <div className="flex flex-1 flex-col p-8 items-center">
        <Photo name={name} photo={photo} />
        <span className="sr-only">Name</span>
        <h3 className="mt-6 text-md font-medium text-gray-900">{title}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Position</dt>
          <dd className="text-sm text-gray-500">{title}</dd>
        </dl>
      </div>
      {contacts &&<div className="flex justify-center space-x-6 md:order-2">
        {contacts.map(({ sys: { id }, fields: { type, value }}: IContact) => <Contact key={id} name={type} value={value} />)}
      </div>}
    </div>
  );
}