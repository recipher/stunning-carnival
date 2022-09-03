import { Link } from "@remix-run/react";

type TeamParams = {
  title: string;
  positions: any;
  zoneId: string;
};

const Positions = ({ positions = [] }) => {
  if (positions.length === 0) return null;
  return (
    <ul className="flex flex-row mt-10 justify-center">
      {/* <PseudoBorder mTop="-mt-10" /> */}
      <div className="-mt-10 border-l-2 absolute h-10 border-gray-400" />
      {positions.map((position, ix) => {
        const len = positions.length;
        return (
          <li key={ix} className="relative p-6">
            <div
              style={{
                left: ix === 0 ? "50%" : 0,
                right: ix === len - 1 ? "50%" : 0
              }}
              className="border-t-2 absolute h-8 border-gray-400 top-0"
            />
            <div className="relative flex justify-center">
              <div className="-mt-6 border-l-2 absolute h-6 border-gray-400 top-0" />
              <Position {...position} ix={ix} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const Position = ({ fields: { name: position, person: { sys: { id }, fields: { name, photo }}, reports } } ) => {
  return (
    <div className="text-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-16">
          <img
            className="block rounded m-auto shadow-md"
            alt={name}
            src={`https://randomuser.me/api/portraits/men/12.jpg`}
          />
        </div>
        <div className="text-gray-600">
          <p><strong>{name}</strong></p>
          <p>{position}</p>
        </div>
      </div>
      {reports?.length > 0 && <Positions positions={reports} />}
    </div>
  );
}

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
      <div className="flex flex-col justify-center items-center">
        <div className="container mx-auto text-center">
          <div className="flex">
            {positions && positions.map((position, ix) => (
              <Position key={ix} {...position} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
