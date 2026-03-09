import { Card, Typography } from "@/components/ui";
import React from "react";
import { View } from "react-native";

interface ProfileStatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export const ProfileStatCard: React.FC<ProfileStatCardProps> = ({
  value,
  label,
  icon,
}) => {
  return (
    <Card
      variant="outline"
      padding="none"
      className="flex-1 mx-1.5 border-gray-100 overflow-hidden bg-white/50"
    >
      <View className="p-4 items-center">
        {icon && <View className="mb-2 p-2 bg-gray-50 rounded-xl">{icon}</View>}
        <Typography
          variant="heading-md"
          color="gray-900"
          className="font-extrabold"
        >
          {value}
        </Typography>
        <Typography
          variant="caption"
          color="gray-500"
          className="text-[10px] uppercase font-bold tracking-widest mt-1 text-center"
        >
          {label}
        </Typography>
      </View>
    </Card>
  );
};
