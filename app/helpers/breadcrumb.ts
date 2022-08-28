type Candidate = {
  item: any;
  child: any;
};

const search = (links: Array<any>, id: string) => {
  const nodes: Candidate = { item: undefined, child: undefined };

  for (const { fields, sys } of links) {
    if (sys.id === id) {
      nodes.item = sys.id;
      break;
    }
    if (fields.links) {
      const result = search(fields.links, id);
      if (result.item) {
        nodes.item = sys.id;
        nodes.child = result;
        break;
      }
    }
  }
  return nodes;
}

export default function(navigation: any, id: string) {
  let path = [], tree = search(navigation.fields.links, id);
  console.log(tree)
  while (tree) {
    path.push(tree.item);
    tree = tree.child;
  }

  return path;
};