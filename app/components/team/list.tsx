import type { IPosition } from "../../../@types/generated/contentful";
import { append } from "ramda";
import Card from "./card";

type TeamParams = {
  title: string;
  positions: any;
  zoneId: string;
};


const flatten = (positions: any) =>
  positions.reduce((flattened: Array<IPosition>, position: IPosition) =>
    position.fields.reports
      ? append(position, flatten(position.fields.reports))
      : append(position, flattened)
  , []).reverse();

export default function Team({
  title,
  positions,
  zoneId,
}: TeamParams) {

  return (
    <>
      <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {flatten(positions).map((position: any, ix: number) => (
            <li key={position.sys.id}>
              <Card key={ix} {...position} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}