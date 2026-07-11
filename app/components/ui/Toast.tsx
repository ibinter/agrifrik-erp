"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
}

const CONFIG = {
  success: {
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle size={18} className="text-green-600 shrink-0" />,
    text: "text-green-800",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    icon: <X size={18} className="text-red-600 shrink-0" />,
    text: "text-red-800",
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    icon: <AlertTriangle size={18} className="text-yellow-600 shrink-0" />,
    text: "text-yellow-800",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: <Info size={18} className="text-blue-600 shrink-0" />,
    text: "text-blue-800",
  },
};

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isVisible, onClose]);

  const cfg = CONFIG[type];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border max-w-sm ${cfg.bg}`}
      >
        {cfg.icon}
        <p className={`text-sm font-medium flex-1 ${cfg.text}`}>{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
