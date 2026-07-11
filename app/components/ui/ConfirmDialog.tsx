"use client";

import { AlertTriangle, CheckCircle } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_CONFIG = {
  danger: {
    icon: <AlertTriangle size={24} className="text-red-500" />,
    iconBg: "bg-red-50",
    confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
    defaultLabel: "Supprimer",
  },
  warning: {
    icon: <AlertTriangle size={24} className="text-yellow-500" />,
    iconBg: "bg-yellow-50",
    confirmBtn: "bg-yellow-500 hover:bg-yellow-600 text-white",
    defaultLabel: "Confirmer",
  },
  primary: {
    icon: <CheckCircle size={24} className="text-green-600" />,
    iconBg: "bg-green-50",
    confirmBtn: "bg-[#2E7D32] hover:bg-[#1B5E20] text-white",
    defaultLabel: "Confirmer",
  },
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = "Annuler",
  variant = "primary",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const cfg = VARIANT_CONFIG[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Body */}
        <div className="px-6 py-6 flex gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
            {cfg.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${cfg.confirmBtn}`}
          >
            {confirmLabel ?? cfg.defaultLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
