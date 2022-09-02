import type { INavigation } from "../../@types/generated/contentful";

export type IBreadcrumb = {
  id: string;
  title: string;
};

type ITree = {
  item: IBreadcrumb | undefined;
  child: any;
};

const toData = (sys: any, fields: any) =>
  fields.entry
    ? { id: fields.entry.sys.id, title: fields.entry.fields.title }
    : { id: sys.id, title: fields.title };

const isMatch = (sys: any, fields: any, id: string) =>
  fields?.entry ? id === fields.entry.sys.id : id === sys?.id;

const search = (links: any, id: string) => {
  const nodes: ITree = { item: undefined, child: undefined };

  for (const { sys, fields } of links) {
    if (isMatch(sys, fields, id)) {
      nodes.item = toData(sys, fields);
      break;
    }
    if (fields?.links) {
      const result = search(fields.links, id);
      if (result.item) {
        nodes.item = toData(sys, fields);
        nodes.child = result;
        break;
      }
    }
  }
  return nodes;
};

export default function (
  navigation: INavigation,
  id: string
): Array<IBreadcrumb> {
  if (navigation === undefined) return [];

  let path = [],
    tree = search(navigation.fields.links, id);

  while (tree) {
    if (tree.item) path.push(tree.item);
    tree = tree.child;
  }

  return path as Array<IBreadcrumb>;
}
