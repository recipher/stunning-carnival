import { Link } from "@remix-run/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  INLINES,
  BLOCKS,
  MARKS,
  EMPTY_DOCUMENT,
} from "@contentful/rich-text-types";
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
    renderText: (text: string) => {
      //@ts-ignore
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderMark: {
      [MARKS.BOLD]: (text: string) => (
        <strong className="font-semibold">{text}</strong>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noreferrer"
          className="font-semibold"
        >
          {children}
        </a>
      ),

      [INLINES.ENTRY_HYPERLINK]: ({
        data: {
          //@ts-ignore
          target: { sys, fields },
        },
      }) => <Link to={`/${zoneId}/${sys.id}`}>{fields.title}</Link>,
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          //@ts-ignore
          target: { sys, fields },
        },
      }) => (
        <img
          key={sys.id}
          src={`https://${fields.file.url}`}
          height={fields.file.details.image.height}
          width={fields.file.details.image.width}
          alt={fields.description}
        />
      ),
    },
  };

  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {/* @ts-ignore */}
      {documentToReactComponents(document, options)}
    </div>
  );
}
