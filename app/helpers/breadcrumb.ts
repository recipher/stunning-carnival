type Candidate = {
  item: any;
  child: any;
};

function createTree(links: Array<any>, id: string) {
  const nodes: Candidate = { item: undefined, child: undefined };

  for (const { fields, sys } of links) {
    if (sys.id === id) {
      nodes.item = sys.id;
      break;
    }
    if (fields.links) {
      const result = createTree(fields.links, id);
      if (result.item) {
        nodes.item = sys.id;
        nodes.child = result;
        break;
      }
    }
  }
  return nodes;
}

function findObject(links: Array<any>, id: string) {
  let result = [], tree = createTree(links, id);
  while (tree) {
    result.push(tree.item);
    tree = tree.child;
  }

  return result;
}

export default function(navigation: any, id: string) {
  const x = findObject(navigation.fields.links, id);
  return x;
};