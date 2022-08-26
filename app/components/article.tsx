import { Link } from "@remix-run/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, EMPTY_DOCUMENT } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

type ArticleParams = {
  title: string;
  document: Document;
  zoneId: string;
};

export default function Article({
  title,
  document = EMPTY_DOCUMENT,
  zoneId,
}: ArticleParams) {
  const options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: ({
        data: {
          //@ts-ignore
          target: { sys, fields },
        },
      }) => {
        return <Link to={`/${zoneId}/${sys.id}`}>{fields.title}</Link>;
      },
    },
  };

  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">
        {/* @ts-ignore */}
        {documentToReactComponents(document, options)}
      </div>
    </div>
  );
}
