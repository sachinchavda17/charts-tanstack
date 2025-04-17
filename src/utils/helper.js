import { format } from "date-fns";

export const formatTimestamp = (timestamp, type = "both") => {
  const date = new Date(timestamp * 1000);

  if (type === "date") return format(date, "yyyy-MM-dd"); // 📅 Date Only
  if (type === "time") return format(date, "HH:mm:ss"); // ⏰ Time Only
  return format(date, "yyyy-MM-dd HH:mm:ss"); // 📅+⏰ Date & Time (Default)
};


export function extractTopologyData(data) {
  const nodes = new Map(); // To store unique nodes
  const links = [];

  data.forEach((entry) => {
    // Add unique nodes
    if (!nodes.has(entry.source)) {
      nodes.set(entry.source, {
        id: entry.source,
        ip: entry.source_port_ip,
        name:entry.source_port_name,
      });
    }
    if (!nodes.has(entry.target)) {
      nodes.set(entry.target, {
        id: entry.target,
        ip: entry.target_port_ip,
      });
    }

    // Add links
    links.push({
      source: entry.source,
      target: entry.target,
      source_port: entry.source_port_name,
      target_port: entry.target_port_name,
      bandwidth: entry.used_bandwidth,
      speed: entry.device_speed,
      status: entry.port_status, // 1 = Active, 0 = Down
    });
  });

  return {
    nodes: Array.from(nodes.values()),
    links,
  };
}