"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function TopologyCompo() {
  const ref = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const nodes = [
      { id: "Router 1", type: "router" },
      { id: "Router 2", type: "router" },
      { id: "Switch 1", type: "switch" },
      { id: "Switch 2", type: "switch" },
      { id: "Server 1", type: "server" },
      { id: "Server 2", type: "server" },
      { id: "Client 1", type: "client" },
      { id: "Client 2", type: "client" },
    ];

    const links = [
      { source: "Router 1", target: "Router 2" },
      { source: "Router 1", target: "Switch 1" },
      { source: "Router 2", target: "Switch 2" },
      { source: "Switch 1", target: "Server 1" },
      { source: "Switch 1", target: "Client 1" },
      { source: "Switch 2", target: "Server 2" },
      { source: "Switch 2", target: "Client 2" },
    ];

    const legendData = [
      { label: "Server", color: "green" },
      { label: "Router", color: "red" },
      { label: "Switch", color: "blue" },
      { label: "Client", color: "orange" },
    ];

    d3.select(ref.current).selectAll("*").remove(); // Clear previous graph

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

    // Define arrow markers
    g.append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#aaa");

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(120)
          .strength(0.5)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Draw links
    const link = g
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Draw nodes
    const node = g
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) =>
        d.type === "router"
          ? "red"
          : d.type === "switch"
          ? "blue"
          : d.type === "server"
          ? "green"
          : "orange"
      )
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
    const labels = g
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("font-size", "12px")
      .attr("fill", "#a09da3")
      .attr("dx", 25)
      .attr("dy", 5);

    // Append Legend
    const legend = svg.append("g").attr("transform", `translate(20, 20)`);

    legend
      .selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => d.color);

    legend
      .selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 20 + 12)
      .attr("font-size", "12px")
      .attr("fill", "#a09da3")
      .text((d) => d.label);

    // Tick function
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    // Node click highlight
    node.on("click", function (event, d) {
      node.attr("fill", (n) =>
        n.id === d.id ||
        links.some(
          (l) =>
            (l.source.id === d.id && l.target.id === n.id) ||
            (l.target.id === d.id && l.source.id === n.id)
        )
          ? "yellow"
          : n.type === "router"
          ? "red"
          : n.type === "switch"
          ? "blue"
          : n.type === "server"
          ? "green"
          : "orange"
      );

      link
        .attr("stroke", (l) =>
          l.source.id === d.id || l.target.id === d.id ? "yellow" : "#aaa"
        )
        .attr("stroke-width", (l) =>
          l.source.id === d.id || l.target.id === d.id ? 3 : 2
        );
    });
  }, []);

  return <div ref={ref} className="w-full h-screen"></div>;
}
