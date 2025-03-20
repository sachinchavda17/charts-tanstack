"use client";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function ForceGraph() {
  const ref = useRef();
  const [nodes, setNodes] = useState([
    { id: "A" },
    { id: "B" },
    { id: "C" },
    { id: "D" },
    { id: "E" },
    { id: "F" },
    { id: "G" },
  ]);

  const [links, setLinks] = useState([
    { source: "A", target: "B" },
    { source: "A", target: "C" },
    { source: "B", target: "D" },
    { source: "A", target: "E" },
    { source: "F", target: "B" },
    { source: "E", target: "G" },
  ]);

  useEffect(() => {
    // const width = 600,
    //   height = 400;

    const width = window.innerWidth; // Full width
    const height = window.innerHeight; // Full height

    // Clear previous graph
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .call(
        d3.zoom().on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
      );

    const g = svg.append("g");
    g.append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 17) // Adjust position
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5") // Triangle shape
      .attr("fill", "#aaa"); // Arrow color

    // Define forces
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .strength(0.2)
      )
      .force("charge", d3.forceManyBody().strength(-300)) // Node repulsion
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(20)); // Avoid node overlap

    // Draw links (edges)
    // const link = svg
    const link = g
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)"); // Attach arrow

    // ✅ Add animated circles (arrows) in the middle of edges
    const movingArrow = svg
      .selectAll(".moving-arrow")
      .data(links)
      .enter()
      .append("circle")
      .attr("r", 4) // Small arrow size
      .attr("fill", "red");

    // Draw nodes
    // const node = svg // due to add zoom
    const node = g
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "blue")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Add labels
    // const labels = svg
    const labels = g
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("font-size", "12px")
      .attr("fill", "#555")
      .attr("dx", 12)
      .attr("dy", 4);

    // Tick function to update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);

      // ✅ Move arrow animation inside tick to sync with force layout
      movingArrow
        .attr("cx", (d) => (d.source.x + d.target.x) / 2)
        .attr("cy", (d) => (d.source.y + d.target.y) / 2);
    });

    // Highlight connections on click
    function handleClick(event, d) {
      node.attr("fill", (n) =>
        n.id === d.id ||
        links.some(
          (l) =>
            (l.source.id === d.id && l.target.id === n.id) ||
            (l.target.id === d.id && l.source.id === n.id)
        )
          ? "orange"
          : "blue"
      );

      link
        .attr("stroke", (l) =>
          l.source.id === d.id || l.target.id === d.id ? "orange" : "#aaa"
        )
        .attr("stroke-width", (l) =>
          l.source.id === d.id || l.target.id === d.id ? 3 : 1
        );
    }

    node.on("click", handleClick);

    // ✅ Call the function to start animation
    animateArrows();

    // ✅ Animate Arrows Moving Along Links
    function animateArrows() {
      movingArrow
        .attr("cx", (d) => (d.source.x + d.target.x) / 2) // Start at the center
        .attr("cy", (d) => (d.source.y + d.target.y) / 2)
        .transition()
        .duration(1000) // Adjust animation speed
        .ease(d3.easeLinear)
        .attrTween("cx", function (d) {
          return function (t) {
            return d.source.x * (1 - t) + d.target.x * t;
          };
        })
        .attrTween("cy", function (d) {
          return function (t) {
            return d.source.y * (1 - t) + d.target.y * t;
          };
        })
        .on("end", animateArrows); // Loop animation
    }
  }, [nodes, links]);

  // Function to add a new node dynamically
  function addNode() {
    const newNode = { id: `Node ${nodes.length + 1}` };
    setNodes([...nodes, newNode]);
    setLinks([
      ...links,
      {
        source: nodes[Math.floor(Math.random() * nodes.length)],
        target: newNode,
      },
    ]);
  }

  return (
    <div>
      <button
        onClick={addNode}
        className="bg-blue-500 text-white p-2 rounded mb-4 cursor-pointer"
      >
        Add Node
      </button>
      <div ref={ref} className="w-full "></div>
    </div>
  );
}
