const isHeadingAtDepth = (node, depth) =>
  node?.type === "element" && node.tagName === `h${depth}`;

const sectionNode = (heading, content, depth) => ({
  type: "element",
  tagName: "details",
  properties: {
    className: ["article-section", `article-section--h${depth}`],
    open: true,
  },
  children: [
    {
      type: "element",
      tagName: "summary",
      properties: { className: ["article-section-summary"] },
      children: [heading],
    },
    {
      type: "element",
      tagName: "div",
      properties: { className: ["article-section-content"] },
      children: depth === 2 ? groupSections(content, 3) : content,
    },
  ],
});

const groupSections = (children, depth) => {
  const grouped = [];
  let heading;
  let content = [];

  const flush = () => {
    if (!heading) return;
    grouped.push(sectionNode(heading, content, depth));
    heading = undefined;
    content = [];
  };

  for (const child of children) {
    if (isHeadingAtDepth(child, depth)) {
      flush();
      heading = child;
      continue;
    }

    if (heading) content.push(child);
    else grouped.push(child);
  }

  flush();
  return grouped;
};

export default function rehypeCollapsibleSections() {
  return (tree) => {
    if (tree?.type !== "root" || !Array.isArray(tree.children)) return;
    tree.children = groupSections(tree.children, 2);
  };
}
