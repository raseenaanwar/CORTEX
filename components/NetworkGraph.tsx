
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'actor' | 'device' | 'ip' | 'merchant' | 'account';
  risk: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
  value: number;
}

interface NetworkGraphProps {
  scenarioId?: string;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ scenarioId }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 450;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);

    let nodes: GraphNode[] = [
      { id: "Subject", type: 'actor', risk: 0.8 },
      { id: "Device_01", type: 'device', risk: 0.6 },
      { id: "IP_Endpoint", type: 'ip', risk: 0.9 },
    ];

    let links: GraphLink[] = [
      { source: "Subject", target: "Device_01", value: 1 },
      { source: "Subject", target: "IP_Endpoint", value: 1 },
    ];

    if (scenarioId === 'FRAUD_RING') {
      nodes.push(
        { id: "Mule_A", type: 'account', risk: 0.95 },
        { id: "Mule_B", type: 'account', risk: 0.95 },
        { id: "Central_Mixer", type: 'merchant', risk: 1.0 }
      );
      links.push(
        { source: "Subject", target: "Mule_A", value: 3 },
        { source: "Subject", target: "Mule_B", value: 3 },
        { source: "Mule_A", target: "Central_Mixer", value: 2 },
        { source: "Mule_B", target: "Central_Mixer", value: 2 }
      );
    } else if (scenarioId === 'AFFILIATE_NET') {
      nodes.push(
        { id: "Proxy_Node", type: 'ip', risk: 0.7 },
        { id: "Affiliate_Hub", type: 'actor', risk: 0.9 },
        { id: "Mule_Network", type: 'account', risk: 0.8 }
      );
      links.push(
        { source: "IP_Endpoint", target: "Proxy_Node", value: 5 },
        { source: "Proxy_Node", target: "Affiliate_Hub", value: 1 },
        { source: "Affiliate_Hub", target: "Mule_Network", value: 1 }
      );
    }

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => d.value);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    node.append("circle")
      .attr("r", 10)
      .attr("fill", d => d.risk > 0.8 ? "#f43f5e" : "#10b981")
      .attr("stroke", "#020617")
      .attr("stroke-width", 2);

    node.append("text")
      .text(d => d.id)
      .attr("font-size", "10px")
      .attr("fill", "#94a3b8")
      .attr("dx", 12)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [scenarioId]);

  return (
    <div className="w-full h-[450px] bg-slate-950/20 rounded-2xl overflow-hidden border border-slate-800">
      <svg ref={svgRef} />
    </div>
  );
};

export default NetworkGraph;
