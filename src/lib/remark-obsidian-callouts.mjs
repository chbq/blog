const calloutMarker = /^\[!([^\]]+)\]([+-])?[ \t]*(.*)$/;

function transformCallout(node) {
  if (node.type !== "blockquote") return;

  const firstParagraph = node.children?.[0];
  const firstText = firstParagraph?.children?.[0];

  if (firstParagraph?.type !== "paragraph" || firstText?.type !== "text") {
    return;
  }

  const [markerLine, ...bodyLines] = firstText.value.split("\n");
  const match = markerLine.match(calloutMarker);
  if (!match) return;

  const type = match[1].toLowerCase();
  const title = match[3] || match[1];
  const bodyText = bodyLines.join("\n").trim();
  const remainingInlineNodes = firstParagraph.children.slice(1);

  const titleParagraph = {
    type: "paragraph",
    data: {
      hProperties: {
        className: ["callout-title"],
      },
    },
    children: [
      {
        type: "strong",
        children: [{ type: "text", value: title }],
      },
    ],
  };

  const bodyNodes = [];
  if (bodyText) bodyNodes.push({ type: "text", value: bodyText });
  bodyNodes.push(...remainingInlineNodes);

  node.data = {
    ...(node.data ?? {}),
    hName: "aside",
    hProperties: {
      className: ["callout", `callout-${type}`],
    },
  };

  node.children = [
    titleParagraph,
    ...(bodyNodes.length
      ? [{ type: "paragraph", children: bodyNodes }]
      : []),
    ...node.children.slice(1),
  ];
}

function walk(node) {
  transformCallout(node);
  if (!Array.isArray(node.children)) return;
  for (const child of node.children) walk(child);
}

export default function remarkObsidianCallouts() {
  return (tree) => walk(tree);
}
