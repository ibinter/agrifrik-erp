type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "cancelled"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "paid"
  | "unpaid"
  | "overdue"
  | "draft"
  | "in_progress"
  | "planned"
  | "done"
  | "critical"
  | "major"
  | "minor"
  | "open"
  | "closed"
  | "resolved";

const STATUS_CONFIG: Record<StatusType, { label: string; className: string }> =
  {
    active: { label: "Actif", className: "bg-green-100 text-green-800" },
    inactive: { label: "Inactif", className: "bg-gray-100 text-gray-600" },
    pending: { label: "En attente", className: "bg-amber-100 text-amber-800" },
    completed: { label: "Terminé", className: "bg-blue-100 text-blue-800" },
    cancelled: { label: "Annulé", className: "bg-red-100 text-red-800" },
    error: { label: "Erreur", className: "bg-red-100 text-red-800" },
    warning: { label: "Attention", className: "bg-amber-100 text-amber-800" },
    info: { label: "Info", className: "bg-blue-100 text-blue-800" },
    success: { label: "Succès", className: "bg-green-100 text-green-800" },
    paid: { label: "Payé", className: "bg-green-100 text-green-800" },
    unpaid: { label: "Non payé", className: "bg-gray-100 text-gray-600" },
    overdue: { label: "En retard", className: "bg-red-100 text-red-800" },
    draft: { label: "Brouillon", className: "bg-gray-100 text-gray-500" },
    in_progress: {
      label: "En cours",
      className: "bg-blue-100 text-blue-700",
    },
    planned: { label: "Planifié", className: "bg-purple-100 text-purple-700" },
    done: { label: "Fait", className: "bg-green-100 text-green-700" },
    critical: { label: "Critique", className: "bg-red-100 text-red-800" },
    major: { label: "Majeur", className: "bg-amber-100 text-amber-800" },
    minor: { label: "Mineur", className: "bg-yellow-100 text-yellow-700" },
    open: { label: "Ouverte", className: "bg-red-100 text-red-700" },
    closed: { label: "Clôturée", className: "bg-gray-100 text-gray-600" },
    resolved: { label: "Résolue", className: "bg-green-100 text-green-700" },
  };

interface StatusBadgeProps {
  status: StatusType;
  label?: string; // override du label par défaut
  size?: "sm" | "md";
}

export default function StatusBadge({
  status,
  label,
  size = "sm",
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      } ${config.className}`}
    >
      {label || config.label}
    </span>
  );
}
