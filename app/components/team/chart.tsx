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
    <ul className="flex flex-row mt-10 justify-center">
      <div className="-mt-10 border-l-2 absolute h-10 border-gray-200" />
      {positions.map((position, ix) => {
        const len = positions.length;
        return (
          <li key={ix} className="relative p-6">
            <div
              style={{
                left: ix === 0 ? "50%" : 0,
                right: ix === len - 1 ? "50%" : 0
              }}
              className="border-t-2 absolute h-8 border-gray-200 top-0"
            />
            <div className="relative flex justify-center">
              <div className="-mt-6 border-l-2 absolute h-6 border-gray-200 top-0" />
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
  const { fields: { title, person: { fields: { name, photo }}, reports }} = props;

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
        <div className="flex flex-col justify-center items-center">
          <div className="w-20 h-20 cursor-pointer" onClick={showModal}>
            <Photo name={name} photo={photo} />
          </div>
          <span className="sr-only">Name</span>
          <h3 className="mt-1 text-md font-medium text-gray-900 cursor-pointer" onClick={showModal}>{name}</h3>
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
}

export default function Team({
  title,
  positions,
  description,
  zoneId,
}: TeamParams) {

  return (
    <>
      <Article title={title} document={description} zoneId={zoneId} />
      <div className="flex flex-col justify-center items-center">
        <div className="container mx-auto text-center">
          <div className="flex">
            {positions && positions.map((position: any, ix: number) => (
              <Position key={ix} {...position} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
