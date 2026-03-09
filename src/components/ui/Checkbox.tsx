import { cn } from "@/utils/cn";
import { Check } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "./Typography";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onPress,
  label,
  className,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      className={cn("flex-row items-start mb-4", className)}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        className={cn(
          "w-6 h-6 rounded-md border-2 items-center justify-center mr-3 mt-0.5",
          checked
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-gray-300",
        )}
      >
        {checked && <Check size={16} color="white" />}
      </View>
      {label && (
        <Typography
          variant="body-md"
          className={cn("flex-1", checked ? "text-gray-900" : "text-gray-600")}
        >
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
}
