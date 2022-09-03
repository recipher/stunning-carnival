import { Link } from "@remix-run/react";

type TeamParams = {
  title: string;
  zoneId: string;
};

export default function Team({
  title,
  zoneId,
}: TeamParams) {

  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
}
