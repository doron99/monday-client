import { useState } from "react";
// import { normalizeKey, statusColors } from "../utils/colors";

export function SummaryBar({ tasks, cmp }) {
  const [tooltip, setTooltip] = useState(null);

  const counts = getCounts(tasks, cmp);
  const items = calcPercents(counts);

  const handleEnter = (e, item) => {
    const color = priorityStatusColors[normalizeKey(item.key)] || "#ccc";

    const rect = e.target.getBoundingClientRect();
    setTooltip({
      label: item.key,
      count: item.value,
      percent: item.percent.toFixed(2),
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      color
    });
  };

  const handleLeave = () => setTooltip(null);

  return (
    <>
      {/* progress bar */}
      {tooltip && (
        <div style={{position:'absolute'}}
        className={`summary-tooltip ${tooltip.visible ? "visible" : ""}`}
          // className="summary-tooltip"
          // style={{ top: tooltip.y, left: tooltip.x }}
        >
          <div className="tooltip-row">
            

            <span>{tooltip.count} / {tasks.length}</span>
            <span
              className="tooltip-color"
              style={{ backgroundColor: tooltip.color }}
            ></span>
          </div>

          <div className="tooltip-percent">{tooltip.percent}%</div>
        </div>
      )}
      <div className="summary-bar">
        {items.map(item => {
          const color = priorityStatusColors[normalizeKey(item.key)] || "#ccc";

          return (
            <div
              key={item.key}
              className="summary-segment"
              style={{ width: `${item.percent}%`, backgroundColor: color }}
              onMouseEnter={(e) => handleEnter(e, item)}
              onMouseLeave={handleLeave}
            ></div>
          );
        })}
      </div>

      {/* tooltip */}
      
    </>
  );
}
export function getCounts(tasks, cmp) {
  const counts = {};
  tasks.forEach(t => {
    const val = t[cmp];
    if (!val) return;
    counts[val] = (counts[val] || 0) + 1;
  });
  return counts;
}
export function calcPercents(counts) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts).map(([key, value]) => ({
    key,
    value,
    percent: (value / total) * 100,
  }));
}
export  function getSummaryCounts(tasks, cmp) {
    const counts = {};

    tasks.forEach(task => {
      const val = task[cmp];
      if (!val) return;

      if (!counts[val]) counts[val] = 0;
      counts[val]++;
    });

    return counts;
  }
export  function toPercents(counts) {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return Object.entries(counts).map(([key, count]) => ({
      key,
      value: count,
      percent: (count / total) * 100
    }));
  }
export function normalizeKey(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}

export const priorityStatusColors = {
  done: "#00c875",          // ירוק
  progress: "#0091ea",      // כחול
  stuck: "#e2445c",         // אדום
  workingonit: "#fdab3d",   // כתום
  notstarted: "#c4c4c4",     // אפור
    high: "#e2445c",
    low: "#0091ea",
    medium: "#fdab3d",
};