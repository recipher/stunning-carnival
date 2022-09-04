import { Link } from "@remix-run/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  INLINES,
  BLOCKS,
  MARKS,
  EMPTY_DOCUMENT,
} from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

import Select from "./select";
import extractHeadings, { slugify } from "../helpers/extractHeadings";
import type { Heading } from "../helpers/extractHeadings";

const MAX_HEADINGS = 3;

type ArticleParams = {
  title: string;
  document: Document | undefined;
  zoneId: string;
};

const SkipLink = ({ value, children }: { value: string; children: any }) => {
  const id = slugify(value);
  return (
    <a className="no-underline" id={slugify(id)} href={`#${id}`}>
      {children}
    </a>
  );
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
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <SkipLink value={node.content[0].value}>
          <h1 className="mt-8">{children}</h1>
        </SkipLink>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <SkipLink value={node.content[0].value}>
          <h2 className="mt-8">{children}</h2>
        </SkipLink>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <SkipLink value={node.content[0].value}>
          <h3 className="mt-8">{children}</h3>
        </SkipLink>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: any) => (
        <SkipLink value={node.content[0].value}>
          <h4 className="mt-8">{children}</h4>
        </SkipLink>
      ),
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
      }) => (
        <Link to={`/${fields.zone.sys.id}/${sys.contentType.sys.id}/${sys.id}`}>
          {fields.title}
        </Link>
      ),
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          //@ts-ignore
          target: {
            //@ts-ignore
            sys,
            //@ts-ignore
            fields: { file, description },
          },
        },
      }) => {
        const type = file.contentType.split("/")[0];

        const image = ({
          key,
          file,
          description,
        }: {
          key: string;
          file: any;
          description: string;
        }) => (
          <img
            key={key}
            src={`https://${file.url}`}
            height={file.details.image.height}
            width={file.details.image.width}
            alt={description}
          />
        );

        const video = ({
          key,
          file,
        }: {
          key: string;
          file: any;
          description: string;
        }) => (
          <video key={key} controls>
            <source src={`https://${file.url}`} type={file.contentType} />
          </video>
        );

        //@ts-ignore
        const component = { image, video }[type];

        return component ? component({ key: sys.id, file, description }) : null;
      },
    },
  };

  const headings = extractHeadings(document);

  const scrollTo = ({ id }: Heading) => {
    window.document.getElementById(id)?.scrollIntoView({ block: "center" });
  };

  return (
    <div className="prose max-w-none py-6 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {headings.length > MAX_HEADINGS && (
        <div className="not-prose">
          <Select label={"Jump to:"} options={headings} onSelect={scrollTo} />
        </div>
      )}
      {/* @ts-ignore */}
      {document && documentToReactComponents(document, options)}
    </div>
  );
}
