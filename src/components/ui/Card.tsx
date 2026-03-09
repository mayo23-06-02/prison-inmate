import { cn } from "@/utils/cn";
import React from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  className?: string;
  onPress?: () => void;
  hoverable?: boolean;
  variant?: "default" | "highlight" | "outline" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  className,
  onPress,
  children,
  hoverable = true,
  variant = "default",
  padding = "md",
  ...props
}: CardProps) {
  const Component = onPress ? TouchableOpacity : View;

  const variantStyles = {
    default: "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700",
    highlight:
      "bg-primary-50 dark:bg-primary-950/20 border-primary-100 dark:border-primary-900/30",
    outline: "bg-transparent border-gray-200 dark:border-gray-700",
    ghost: "bg-transparent border-transparent",
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <Component
      className={cn(
        "rounded-2xl shadow-sm border",
        variantStyles[variant],
        paddingStyles[padding],
        onPress && hoverable ? "active:bg-gray-50/50" : "",
        className,
      )}
      onPress={onPress}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ className, children, ...props }: ViewProps) {
  return (
    <View
      className={cn("flex-row items-center justify-between mb-3", className)}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardContent({ className, children, ...props }: ViewProps) {
  return (
    <View className={cn("space-y-2", className)} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ className, children, ...props }: ViewProps) {
  return (
    <View
      className={cn("mt-4 pt-4 border-t border-gray-50", className)}
      {...props}
    >
      {children}
    </View>
  );
}
