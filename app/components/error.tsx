export default function Error({
  message,
  details,
}: {
  message: string;
  details?: string;
}) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="my-auto flex-shrink-0 py-16 sm:py-32">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
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
