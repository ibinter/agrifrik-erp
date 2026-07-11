import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  changeUp?: boolean;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor?: string;
  iconBg?: string;
}

export default function StatCard({
  label,
  value,
  unit,
  change,
  changeUp,
  icon: Icon,
  iconColor = "#2E7D32",
  iconBg = "#E8F5E9",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
      {/* Icône */}
      <div
        className="rounded-xl p-2.5 flex-shrink-0"
        style={{ background: iconBg }}
      >
        <Icon size={20} color={iconColor} />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-1 truncate">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-gray-900 leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-xs text-gray-400 font-medium">{unit}</span>
          )}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${
              changeUp ? "text-[#2E7D32]" : "text-red-500"
            }`}
          >
            {changeUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}
