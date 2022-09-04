import type { IContact } from "../../../@types/generated/contentful";

import Photo from "./photo";
import Contact from "../contact";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function Card({
  className = "border",
  fields: {
    //@ts-ignore
    title,
    person: {
      //@ts-ignore
      fields: { name, photo, bio, contacts },
    },
  },
}) {
  return (
    <div
      className={classNames(
        className,
        "col-span-1 flex flex-col border-gray-200 bg-white py-4 text-center"
      )}
    >
      <div className="flex flex-1 flex-col items-center p-8">
        <Photo name={name} photo={photo} />
        <span className="sr-only">Name</span>
        <h3 className="mt-6 text-lg font-semibold text-gray-900">{name}</h3>
        <dl className="mt-1 mb-3 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Position</dt>
          <dd className="text-md text-gray-600">{title}</dd>
        </dl>
        <p className="prose text-sm text-gray-500">{bio}</p>
      </div>
      {contacts && (
        <div className="flex justify-center space-x-6 md:order-2">
          {contacts.map(
            ({ sys: { id }, fields: { type, value } }: IContact) => (
              <Contact key={id} name={type} value={value} />
            )
          )}
        </div>
      )}
    </div>
  );
}
