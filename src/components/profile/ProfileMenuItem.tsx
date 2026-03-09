// src/components/profile/ProfileMenuItem.tsx
import { Typography } from "@/components/ui";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  showChevron?: boolean;
  className?: string;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  label,
  onPress,
  showChevron = true,
  className = "",
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center py-4 px-1 ${className}`}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <View className="w-8 items-center">{icon}</View>
      <Typography variant="body-md" color="gray-700" className="flex-1 ml-3">
        {label}
      </Typography>
      {showChevron && <ChevronRight size={18} color="#9CA3AF" />}
    </TouchableOpacity>
  );
};
