import { cn } from "@/utils/cn";
import React, { useEffect } from "react";
import { Animated } from "react-native";

interface SkeletonProps {
  variant?: "rect" | "circle" | "rounded";
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Skeleton({
  variant = "rect",
  width,
  height,
  className,
}: SkeletonProps) {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  const variantStyles = {
    rect: "",
    circle: "rounded-full",
    rounded: "rounded-xl",
  };

  return (
    <Animated.View
      className={cn(
        "bg-gray-200 dark:bg-gray-700",
        variantStyles[variant],
        className,
      )}
      style={{
        width,
        height,
        opacity,
      }}
    />
  );
}
