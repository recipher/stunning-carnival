export default function Error({
  message,
  details,
}: {
  message: string;
  details?: string;
}) {
  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">{message}</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">{details}</div>
    </div>
  );
}
