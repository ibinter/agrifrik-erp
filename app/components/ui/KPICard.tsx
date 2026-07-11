import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  variation?: number; // % de variation, positif = hausse
  variationLabel?: string;
  alert?: "none" | "warning" | "critical";
  onClick?: () => void;
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-green-700",
  iconBg = "bg-green-50",
  variation,
  variationLabel,
  alert = "none",
  onClick,
}: KPICardProps) {
  const isPositive = variation !== undefined && variation > 0;
  const isNegative = variation !== undefined && variation < 0;

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border bg-white dark:bg-gray-900 p-5 transition-all ${
        alert === "critical"
          ? "border-red-200 bg-red-50/30"
          : alert === "warning"
            ? "border-amber-200 bg-amber-50/30"
            : "border-gray-100 dark:border-gray-700"
      } ${onClick ? "cursor-pointer hover:shadow-md" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </p>
        {Icon && (
          <div className={`p-2 rounded-xl ${iconBg}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
      {variation !== undefined && (
        <div
          className={`flex items-center gap-1 mt-2 text-xs font-medium ${
            isPositive
              ? "text-green-600"
              : isNegative
                ? "text-red-600"
                : "text-gray-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : isNegative ? (
            <TrendingDown className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
          {variation > 0 ? "+" : ""}
          {variation}% {variationLabel || "vs N-1"}
        </div>
      )}
    </div>
  );
}
