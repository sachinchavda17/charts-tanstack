import { format } from "date-fns";

export const formatTimestamp = (timestamp, type = "both") => {
  const date = new Date(timestamp * 1000);

  if (type === "date") return format(date, "yyyy-MM-dd"); // 📅 Date Only
  if (type === "time") return format(date, "HH:mm:ss"); // ⏰ Time Only
  return format(date, "yyyy-MM-dd HH:mm:ss"); // 📅+⏰ Date & Time (Default)
};
