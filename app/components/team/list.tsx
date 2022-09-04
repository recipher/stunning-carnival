import type { IPosition } from "../../../@types/generated/contentful";
import type { Document } from "@contentful/rich-text-types";
import { append } from "ramda";
import Card from "./card";

import Article from "../article";

type TeamParams = {
  title: string;
  positions: any;
  description: Document | undefined;
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
  description,
  zoneId,
}: TeamParams) {

  return (
    <>
      <Article title={title} document={description} zoneId={zoneId} />
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