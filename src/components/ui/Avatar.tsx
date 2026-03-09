import { cn } from "@/utils/cn";
import { Image, ImageProps } from "expo-image";
import { User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Typography } from "./Typography";

interface AvatarProps extends Partial<ImageProps> {
  size?: "sm" | "md" | "lg" | "xl";
  src?: string | null;
  initials?: string;
  fallback?: string;
  className?: string;
}

export function Avatar({
  size = "md",
  source,
  src,
  initials,
  fallback,
  className,
  ...props
}: AvatarProps) {
  const avatarSource = src ? { uri: src } : source;
  const avatarFallback = initials || fallback;

  const sizeStyles = {
    sm: "w-8 h-8 rounded-full",
    md: "w-12 h-12 rounded-full",
    lg: "w-16 h-16 rounded-full",
    xl: "w-24 h-24 rounded-full",
  };

  const textStyles = {
    sm: "text-caption",
    md: "text-body-sm",
    lg: "text-body-md",
    xl: "text-heading-md",
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };

  return (
    <View
      className={cn(
        "items-center justify-center bg-gray-100 border border-gray-200 overflow-hidden",
        sizeStyles[size],
        className,
      )}
    >
      {avatarSource ? (
        <Image
          source={avatarSource}
          className={cn("w-full h-full", sizeStyles[size])}
          contentFit="cover"
          transition={200}
          {...props}
        />
      ) : avatarFallback ? (
        <Typography
          variant="label"
          className={cn("text-gray-500", textStyles[size])}
        >
          {avatarFallback.substring(0, 2).toUpperCase()}
        </Typography>
      ) : (
        <User size={iconSizes[size]} color="#9CA3AF" />
      )}
    </View>
  );
}
