import React, { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  // FIX: Instructs Mermaid to suppress its default error screen injection behavior
  suppressErrors: true,
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/```mermaid/g, "")
    .replace(/```/g, "")
    .trim();

  const validPrefixes = [
    "graph",
    "flowchart",
    "sequencediagram",
    "classdiagram",
    "statediagram",
    "erdiagram",
    "gantt",
    "pie",
    "gitgraph",
  ];
  const firstWord = clean.split(/\s+/)[0].toLowerCase();

  if (!validPrefixes.some((prefix) => firstWord.startsWith(prefix))) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);
  const uniqueId = useId().replace(/:/g, "");

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!containerRef.current || !diagram) return;

      try {
        const cleanCode = cleanMermaidChart(diagram);

        if (isMounted) {
          containerRef.current.innerHTML = "";
        }

        const { svg } = await mermaid.render(`mermaid-${uniqueId}`, cleanCode);

        if (isMounted) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid rendering failed:", error);

        if (isMounted) {
          // This block now catches and handles the view placeholder safely
          containerRef.current.innerHTML =
            '<p style="color: #ef4444; font-size: 13px; font-weight: 500; font-family: monospace; padding: 4px;">Failed to render diagram syntax.</p>';
        }

        // FIX: Cleans up broken bind elements that Mermaid leaves behind in the document body on failed renders
        const errorSvgElement = document.getElementById(`dmermaid-${uniqueId}`);
        if (errorSvgElement) {
          errorSvgElement.remove();
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [diagram, uniqueId]);

  return (
    <div
      className="mermaid-container"
      style={{ width: "100%", overflowX: "auto" }}
    >
      <div ref={containerRef} />
    </div>
  );
};

export default MermaidSetup;
