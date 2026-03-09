import { Typography } from "@/components/ui";
import React from "react";
import { View } from "react-native";

interface ProfileMenuSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileMenuSection: React.FC<ProfileMenuSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View className="mt-8 px-2">
      <Typography
        variant="caption"
        color="gray-400"
        className="uppercase font-black text-[10px] tracking-widest ml-2 mb-4"
      >
        {title}
      </Typography>
      <View className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-50 dark:border-gray-800 overflow-hidden px-4">
        {children}
      </View>
    </View>
  );
};
