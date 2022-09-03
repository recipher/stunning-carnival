import { UserCircleIcon } from "@heroicons/react/solid";

export default function Photo({ name, photo, className }: { name: string, photo: any, className: string }) {
  if (photo === undefined) return <UserCircleIcon className="text-gray-400 w-20 h-20" />

  return (
    <img
      className={className}
      alt={name}
      src={`https://randomuser.me/api/portraits/men/12.jpg`}
    />
  );
}