interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  title?: string;
}

export default function DonutChart({ data, size = 180, title }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const strokeWidth = size * 0.14;
  const circumference = 2 * Math.PI * r;

  // Build segments
  let offset = -circumference * 0.25; // start from top
  const segments = data.map((d) => {
    const dash = (d.value / total) * circumference;
    const gap = circumference - dash;
    const seg = { dash, gap, offset, color: d.color };
    offset += dash;
    return seg;
  });

  return (
    <div style={{ width: "100%" }}>
      {title && (
        <div className="text-sm font-semibold text-gray-800 mb-3">{title}</div>
      )}
      <style>{`
        @keyframes donutIn {
          from { stroke-dashoffset: var(--dash-target); opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        .donut-seg {
          animation: donutIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: size, height: size, display: "block" }}
        >
          {/* Background ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#F5F5F5"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="butt"
              className="donut-seg"
              style={{
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}

          {/* Center text */}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize={size * 0.11} fontWeight={700} fill="#212121">
            {total.toLocaleString()}
          </text>
          <text x={cx} y={cy + size * 0.09} textAnchor="middle" fontSize={size * 0.075} fill="#9E9E9E">
            total
          </text>
        </svg>

        {/* Legend */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
          {data.map((d, i) => {
            const pct = ((d.value / total) * 100).toFixed(0);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0, display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "#424242", flex: 1 }}>{d.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: d.color }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
