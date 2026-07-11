interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  title?: string;
  unit?: string;
}

export default function BarChart({ data, height = 220, title, unit }: BarChartProps) {
  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 24;
  const paddingBottom = 52;
  const width = 480;
  const chartH = height - paddingTop - paddingBottom;
  const chartW = width - paddingLeft - paddingRight;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const ticks = 5;
  const tickStep = maxVal / ticks;

  const barWidth = (chartW / data.length) * 0.55;
  const barGap = chartW / data.length;

  return (
    <div style={{ width: "100%" }}>
      {title && (
        <div className="text-sm font-semibold text-gray-800 mb-2">{title}</div>
      )}
      <style>{`
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .bar-animated {
          transform-origin: bottom;
          animation: barGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Y axis ticks + grid */}
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const val = tickStep * i;
          const y = paddingTop + chartH - (val / maxVal) * chartH;
          const label = val >= 1_000_000
            ? `${(val / 1_000_000).toFixed(0)}M`
            : val >= 1_000
            ? `${(val / 1_000).toFixed(0)}k`
            : `${val.toFixed(0)}`;
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#F0F0F0"
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 6}
                y={y + 4}
                textAnchor="end"
                fontSize={10}
                fill="#9E9E9E"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Y axis line */}
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + chartH}
          stroke="#E0E0E0"
          strokeWidth={1}
        />
        {/* X axis line */}
        <line
          x1={paddingLeft}
          y1={paddingTop + chartH}
          x2={width - paddingRight}
          y2={paddingTop + chartH}
          stroke="#E0E0E0"
          strokeWidth={1}
        />

        {/* Bars */}
        {data.map((d, i) => {
          const barH = Math.max((d.value / maxVal) * chartH, 2);
          const x = paddingLeft + i * barGap + (barGap - barWidth) / 2;
          const y = paddingTop + chartH - barH;
          const color = d.color ?? "#2E7D32";
          const valLabel = d.value >= 1_000_000
            ? `${(d.value / 1_000_000).toFixed(0)}M`
            : d.value >= 1_000
            ? `${(d.value / 1_000).toFixed(0)}k`
            : `${d.value}`;

          return (
            <g key={i}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={3}
                fill={color}
                className="bar-animated"
                style={{ animationDelay: `${i * 0.07}s` }}
              />
              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill="#424242"
              >
                {valLabel}{unit ? ` ${unit}` : ""}
              </text>
              {/* X label */}
              <text
                x={x + barWidth / 2}
                y={paddingTop + chartH + 14}
                textAnchor="end"
                fontSize={10}
                fill="#757575"
                transform={`rotate(-30, ${x + barWidth / 2}, ${paddingTop + chartH + 14})`}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
