"use client";

import { useEffect, useRef } from "react";
import ForceGraph3D from "3d-force-graph";

const ForceGraph3DComponent = () => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!graphRef.current) return;
    // Random tree data
    const N = 10;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };

    // Create the graph
    const Graph = ForceGraph3D()(graphRef.current)
      .graphData(gData)
      .nodeAutoColorBy("id") // Color nodes based on ID
      .linkDirectionalParticles(2) // Add small particles moving along edges
      .linkDirectionalArrowLength(3) // Add small arrow at the end of edges
      .nodeLabel(node => `Node ${node.id}`); // Show label on hover

    return () => {
      Graph._destructor && Graph._destructor(); // Cleanup on unmount
    };
  }, []);

  return (
    <div ref={graphRef} className="w-full h-screen" />
  );
};

export default ForceGraph3DComponent;
