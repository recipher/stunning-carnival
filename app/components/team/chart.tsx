import { useState } from "react";
import type { Document } from "@contentful/rich-text-types";
import Photo from "./photo";
import Article from "../article";
import Card from "./card";
import Modal from "../modal";

type TeamParams = {
  title: string;
  positions: any;
  description: Document | undefined;
  zoneId: string;
};

const Positions = ({ positions = [] }) => {
  if (positions.length === 0) return null;

  return (
    <ul className="mt-10 flex flex-row justify-center">
      <div className="absolute -mt-10 h-10 border-l-2 border-gray-200" />
      {positions.map((position, ix) => {
        const len = positions.length;
        return (
          <li key={ix} className="relative p-6">
            <div
              style={{
                left: ix === 0 ? "50%" : 0,
                right: ix === len - 1 ? "50%" : 0,
              }}
              className="absolute top-0 h-8 border-t-2 border-gray-200"
            />
            <div className="relative flex justify-center">
              <div className="absolute top-0 -mt-6 h-6 border-l-2 border-gray-200" />
              {/*@ts-ignore*/}
              <Position {...position} ix={ix} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

//@ts-ignore
const Position = (props) => {
  const {
    fields: {
      title,
      person: {
        fields: { name, photo },
      },
      reports,
    },
  } = props;

  const [showCard, setShowCard] = useState(false);

  const showModal = (e: any) => {
    e.stopPropagation();
    setShowCard(true);
  };

  return (
    <>
      <Modal open={showCard} setOpen={setShowCard}>
        <Card {...props} className="" />
      </Modal>
      <div className="text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="h-20 w-20 cursor-pointer" onClick={showModal}>
            <Photo name={name} photo={photo} />
          </div>
          <span className="sr-only">Name</span>
          <h3
            className="text-md mt-1 cursor-pointer font-medium text-gray-900"
            onClick={showModal}
          >
            {name}
          </h3>
          <dl className="flex flex-grow flex-col justify-between">
            <dt className="sr-only">Position</dt>
            <dd className="text-sm text-gray-500">{title}</dd>
            {/* <dd className="mt-3">
              <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Admin
              </span>
            </dd> */}
          </dl>
        </div>
        {reports?.length > 0 && <Positions positions={reports} />}
      </div>
    </>
  );
};

export default function Team({
  title,
  positions,
  description,
  zoneId,
}: TeamParams) {
  return (
    <>
      <Article title={title} document={description} zoneId={zoneId} />
      <div className="flex flex-col items-center justify-center">
        <div className="container mx-auto text-center">
          <div className="flex">
            {positions &&
              positions.map((position: any, ix: number) => (
                <Position key={ix} {...position} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
