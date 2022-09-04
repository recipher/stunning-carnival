export default function Error({
  message,
  details,
  statusCode = 500,
}: {
  message: string;
  details?: string;
  statusCode: number;
}) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="my-auto flex-shrink-0 py-5">
        <p className="text-base font-semibold text-indigo-600">{statusCode}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {message}
        </h1>
        <p className="mt-2 text-base text-gray-500">{details}</p>
        <div className="mt-6">
          <a
            href="mailto:knowledgemanagement@safeguardglobal.com"
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          >
            Contact Knowledge Management
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
