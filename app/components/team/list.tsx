import Card from "./card";

type TeamParams = {
  title: string;
  positions: any;
  zoneId: string;
};

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
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {positions.map((position, ix) => (
            <li
              key={position.sys.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <Card key={ix} {...position} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}