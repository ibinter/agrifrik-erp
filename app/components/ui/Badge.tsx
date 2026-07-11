import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant: "success" | "warning" | "danger" | "info" | "neutral" | "primary";
  size?: "sm" | "md";
}

const variantClasses: Record<BadgeProps["variant"], string> = {
  success: "bg-green-100 text-green-800",
  warning: "bg-orange-100 text-orange-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  neutral: "bg-gray-100 text-gray-600",
  primary: "bg-[#E8F5E9] text-[#1B5E20]",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({ children, variant, size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}
