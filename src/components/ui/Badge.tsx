import { cn } from "@/utils/cn";
import React from "react";
import { View, ViewProps } from "react-native";
import { Typography } from "./Typography";

interface BadgeProps extends ViewProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "outline"
    | "ghost";
  label?: string;
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function Badge({
  variant = "primary",
  label,
  className,
  rounded = "full",
  children,
  ...props
}: BadgeProps) {
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const variantStyles = {
    primary: "bg-primary-50 border-primary-200 text-primary-600",
    secondary: "bg-blue-50 border-blue-200 text-blue-600",
    success: "bg-green-50 border-green-200 text-green-600",
    warning: "bg-orange-50 border-orange-200 text-orange-600",
    error: "bg-red-50 border-red-200 text-red-600",
    outline: "bg-transparent border-gray-200 text-gray-500",
    ghost: "bg-gray-100 border-transparent text-gray-600",
  };

  const textStyles = {
    primary: "text-primary-600",
    secondary: "text-blue-600",
    success: "text-green-600",
    warning: "text-orange-600",
    error: "text-red-600",
    outline: "text-gray-500",
    ghost: "text-gray-600",
  };

  return (
    <View
      className={cn(
        "px-2 py-0.5 border items-center justify-center inline-flex",
        roundedStyles[rounded],
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {label ? (
        <Typography
          variant="body-sm"
          className={cn(
            "font-bold uppercase tracking-wider text-[10px]",
            textStyles[variant],
          )}
        >
          {label}
        </Typography>
      ) : typeof children === "string" ? (
        <Typography
          variant="body-sm"
          className={cn(
            "font-semibold font-bold uppercase tracking-wider text-[10px]",
            textStyles[variant],
          )}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </View>
  );
}
