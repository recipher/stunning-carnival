import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { EMPTY_DOCUMENT } from "@contentful/rich-text-types";

import { getArticle } from "~/models/article.server";

type LoaderData = NonNullable<Awaited<ReturnType<typeof getArticle>>>;

export const loader: LoaderFunction = async ({ params }) => {
  const article = await getArticle(params.articleId as string);
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>(article);
};

export default function ArticlePage() {
  const { fields } = useLoaderData() as LoaderData;
  const { title, contents = EMPTY_DOCUMENT } = fields;

  return (
    <div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="py-6">{documentToReactComponents(contents)}</p>
      <hr className="my-4" />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Entry not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
