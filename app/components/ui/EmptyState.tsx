import React from "react";

interface EmptyStateProps {
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {Icon && (
        <div className="mb-4">
          <Icon size={48} color="#D1D5DB" />
        </div>
      )}
      <p className="font-medium text-gray-600 text-sm">{title}</p>
      {description && (
        <p className="text-sm text-gray-400 mt-1 max-w-xs">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 px-4 py-2 text-sm font-medium text-white rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2E7D32" }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
