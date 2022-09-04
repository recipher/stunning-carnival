import { append } from "ramda";
import { helpers } from "@contentful/rich-text-types";
import type { Block, Node, Inline } from "@contentful/rich-text-types";

export const slugify = (text: string) =>
  text
    .trim()
    .replace(/[^A-Za-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

export function documentToPlainTextString(root: Block | Inline) {
  const blockDivisor: string = " ";
  return (root as Block).content.reduce(
    (text: string, node: Node, i: number): string => {
      let value: string = "";

      if (helpers.isText(node)) {
        value = node.value;
      } else if (helpers.isBlock(node) || helpers.isInline(node)) {
        value = documentToPlainTextString(node);
        if (!value.length) return text;
      }

      const nextNode = root.content[i + 1];
      const isNextNodeBlock = nextNode && helpers.isBlock(nextNode);
      const divisor = isNextNodeBlock ? blockDivisor : "";
      return text + value + divisor;
    },
    ""
  );
}

const HEADINGS = ["heading-1", "heading-2", "heading-3", "heading-4"];

export type Heading = {
  id: string;
  text: string;
  nodeType: string;
};

export default function extractHeadings(
  root: Block | Inline,
  headings: Array<Heading> = []
) {
  if (!root || !root.content) return [];

  return (root as Block).content.reduce(
    (headings: Array<Heading>, node: Node, i: number): Array<Heading> => {
      if (helpers.isBlock(node) && HEADINGS.includes(node.nodeType)) {
        const text = documentToPlainTextString(node);
        const heading = { text, id: slugify(text), nodeType: node.nodeType };
        return append(heading, extractHeadings(node, headings));
      }
      return headings;
    },
    headings
  );
}
