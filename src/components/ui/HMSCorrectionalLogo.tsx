import { cn } from "@/utils/cn";
import { Image } from "expo-image";
import React from "react";
import { View, ViewProps } from "react-native";

interface HMSCorrectionalLogoProps extends ViewProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function HMSCorrectionalLogo({
  size = "md",
  className,
  ...props
}: HMSCorrectionalLogoProps) {
  const sizeStyles = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  return (
    <View className={cn("items-center justify-center", className)} {...props}>
      <Image
        source={require("../../assets/images/hms.png")}
        className={cn(sizeStyles[size])}
        contentFit="contain"
        transition={300}
      />
    </View>
  );
}
