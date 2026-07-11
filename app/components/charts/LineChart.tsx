interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  fillArea?: boolean;
  title?: string;
  unit?: string;
}

export default function LineChart({
  data,
  height = 220,
  color = "#2E7D32",
  fillArea = false,
  title,
  unit,
}: LineChartProps) {
  const paddingLeft = 52;
  const paddingRight = 16;
  const paddingTop = 24;
  const paddingBottom = 36;
  const width = 480;
  const chartH = height - paddingTop - paddingBottom;
  const chartW = width - paddingLeft - paddingRight;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const minVal = Math.min(...data.map((d) => d.value), 0);
  const range = maxVal - minVal || 1;
  const ticks = 5;

  const getX = (i: number) =>
    paddingLeft + (i / (data.length - 1)) * chartW;
  const getY = (v: number) =>
    paddingTop + chartH - ((v - minVal) / range) * chartH;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ");

  // Smooth bezier path
  const pathD = data.reduce((acc, d, i) => {
    const x = getX(i);
    const y = getY(d.value);
    if (i === 0) return `M ${x} ${y}`;
    const px = getX(i - 1);
    const py = getY(data[i - 1].value);
    const cpx = (px + x) / 2;
    return `${acc} C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`;
  }, "");

  const fillPath = `${pathD} L ${getX(data.length - 1)} ${paddingTop + chartH} L ${getX(0)} ${paddingTop + chartH} Z`;

  return (
    <div style={{ width: "100%" }}>
      {title && (
        <div className="text-sm font-semibold text-gray-800 mb-2">{title}</div>
      )}
      <style>{`
        @keyframes lineDrawIn {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
        .line-animated {
          stroke-dasharray: 2000;
          animation: lineDrawIn 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Y ticks + grid */}
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const val = minVal + (range / ticks) * i;
          const y = getY(val);
          const label = val >= 1_000_000
            ? `${(val / 1_000_000).toFixed(0)}M`
            : val >= 1_000
            ? `${(val / 1_000).toFixed(0)}k`
            : `${val.toFixed(0)}`;
          return (
            <g key={i}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#F0F0F0" strokeWidth={1} />
              <text x={paddingLeft - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#9E9E9E">{label}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartH} stroke="#E0E0E0" strokeWidth={1} />
        <line x1={paddingLeft} y1={paddingTop + chartH} x2={width - paddingRight} y2={paddingTop + chartH} stroke="#E0E0E0" strokeWidth={1} />

        {/* Fill area */}
        {fillArea && (
          <path d={fillPath} fill={color} fillOpacity={0.12} />
        )}

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="line-animated"
        />

        {/* Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={getX(i)}
            cy={getY(d.value)}
            r={4}
            fill="white"
            stroke={color}
            strokeWidth={2}
          />
        ))}

        {/* X labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={getX(i)}
            y={paddingTop + chartH + 16}
            textAnchor="middle"
            fontSize={10}
            fill="#757575"
          >
            {d.label}
          </text>
        ))}

        {/* Value labels on hover — static tooltip on last point */}
        {unit && (
          <text
            x={getX(data.length - 1)}
            y={getY(data[data.length - 1].value) - 10}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill={color}
          >
            {data[data.length - 1].value}{unit}
          </text>
        )}
      </svg>
    </div>
  );
}
