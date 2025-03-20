"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function D3Component() {
  const ref = useRef();

  useEffect(() => {
    const data = [10, 20, 30, 40, 50];
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
    // 🛑 Remove previous SVG (if any) before appending a new one
    d3.select(ref.current).select("svg").remove();

    
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d))
      .attr("fill", "steelblue");

    // Add X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((d) => `Item ${d + 1}`));

    // Add Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));    

    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", (d, i) => i * 60 + 50)
    //   .attr("cy", 500)
    //   .attr("r", (d) => d / 2)
    //   .attr("fill", "red");
  }, []);

  return <div ref={ref}></div>;
}
