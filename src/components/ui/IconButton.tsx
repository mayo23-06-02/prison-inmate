import { cn } from "@/utils/cn";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Typography } from "./Typography";

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function IconButton({
  icon,
  variant = "primary",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  const variantStyles = {
    primary: "bg-primary-500 active:bg-primary-600",
    secondary: "bg-secondary-blue active:bg-blue-800",
    outline: "border-2 border-primary-500 active:bg-primary-50",
    ghost: "bg-transparent active:bg-gray-100",
    danger: "bg-secondary-red active:bg-red-800",
  };

  const sizeStyles = {
    sm: "p-2 rounded-lg",
    md: "p-3 rounded-xl",
    lg: "p-4 rounded-2xl",
  };

  return (
    <TouchableOpacity
      className={cn(
        "items-center justify-center",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {typeof icon === "string" ? <Typography>{icon}</Typography> : icon}
    </TouchableOpacity>
  );
}
