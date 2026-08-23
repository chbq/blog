import { renderMermaidSVG } from "beautiful-mermaid";

const theme = {
  bg: "#f3f0e8",
  fg: "#22231f",
  line: "#6d6c64",
  accent: "#a3482f",
  muted: "#6d6c64",
  surface: "#e4e6d9",
  border: "#cbc6b9",
  transparent: true,
};

export default function remarkMermaidSvg() {
  return (tree, file) => {
    let diagramIndex = 0;

    const transformChildren = (parent) => {
      if (!Array.isArray(parent.children)) return;

      for (let index = 0; index < parent.children.length; index += 1) {
        const node = parent.children[index];

        if (node.type === "code" && node.lang === "mermaid") {
          diagramIndex += 1;

          try {
            const label = `流程图 ${diagramIndex}`;
            const renderedSvg = renderMermaidSVG(node.value, theme);
            const intrinsicWidth = Number(
              renderedSvg.match(/\bwidth="([^"]+)"/)?.[1] ?? 0,
            );
            const layout =
              intrinsicWidth > 900
                ? "wide"
                : intrinsicWidth < 400
                  ? "compact"
                  : "fit";
            const svg = renderedSvg.replace(
              "<svg ",
              `<svg class="mermaid-svg" role="img" aria-label="${label}" focusable="false" `,
            );

            parent.children[index] = {
              type: "html",
              value: `<figure class="mermaid-diagram mermaid-diagram--${layout}">${svg}</figure>`,
            };
          } catch (error) {
            file.fail(`Mermaid rendering failed: ${error.message}`, node);
          }
        } else {
          transformChildren(node);
        }
      }
    };

    transformChildren(tree);
  };
}
