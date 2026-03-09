import { cn } from "@/utils/cn";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Typography } from "./Typography";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "full";
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "primary",
  size = "md",
  label,
  icon,
  iconPosition = "left",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-primary-500 active:bg-primary-600",
    secondary: "bg-secondary-blue active:bg-blue-800",
    outline: "border-2 border-primary-500 active:bg-primary-50",
    ghost: "bg-transparent active:bg-gray-100",
    danger: "bg-secondary-red active:bg-red-800",
  };

  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
    full: "w-full py-4",
  };

  const textStyles = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-primary-500",
    ghost: "text-gray-600",
    danger: "text-white",
  };

  return (
    <TouchableOpacity
      className={cn(
        "rounded-lg flex-row items-center justify-center space-x-2",
        variantStyles[variant],
        sizeStyles[size],
        disabled ? "opacity-50" : "",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {label && (
        <Typography
          variant="button"
          className={cn("text-center", textStyles[variant])}
        >
          {label}
        </Typography>
      )}
      {typeof children === "string" ? (
        <Typography
          variant="button"
          className={cn("text-center", textStyles[variant])}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
      {icon && iconPosition === "right" && icon}
    </TouchableOpacity>
  );
}
