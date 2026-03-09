import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface PackageCardProps {
  name: string;
  minutes: number;
  price: string;
  validity: string;
  type: "Local" | "International";
  selected?: boolean;
  onSelect: () => void;
}

export const PackageCard = ({
  name,
  minutes,
  price,
  validity,
  type,
  selected,
  onSelect,
}: PackageCardProps) => {
  const textShadow = {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  };

  return (
    <Pressable
      onPress={onSelect}
      className={cn(
        "w-64 bg-white rounded-3xl p-5 mr-4 border-2 shadow-card",
        selected
          ? "border-primary-500 bg-primary-50"
          : "border-gray-50 bg-white",
      )}
    >
      <View className="flex-row justify-between items-start mb-4">
        <View
          className={cn(
            "px-2.5 py-1 rounded-lg",
            type === "Local" ? "bg-green-100" : "bg-blue-100",
          )}
        >
          <Text
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              type === "Local" ? "text-green-700" : "text-blue-700",
            )}
          >
            {type}
          </Text>
        </View>
        {selected && <CheckCircle size={24} color="#008400" />}
      </View>

      <Text
        className="text-gray-900 font-black text-xl uppercase tracking-tight"
        style={textShadow}
      >
        {name}
      </Text>

      <View className="flex-row items-baseline mt-1 mb-4">
        <Text className="text-gray-900 font-black text-3xl">{minutes}</Text>
        <Text className="text-gray-400 font-bold ml-1 uppercase text-xs">
          Minutes
        </Text>
      </View>

      <View className="flex-row justify-between items-end border-t border-gray-100 pt-4">
        <View>
          <Typography
            variant="label"
            className="text-gray-400 font-bold uppercase text-[9px] tracking-widest"
          >
            Price
          </Typography>
          <Text className="text-primary-600 font-black text-lg">
            SZL {price}
          </Text>
        </View>
        <View className="items-end">
          <Typography
            variant="label"
            className="text-gray-400 font-bold uppercase text-[9px] tracking-widest"
          >
            Validity
          </Typography>
          <Text className="text-gray-700 font-bold text-xs">{validity}</Text>
        </View>
      </View>

      <View
        className={cn(
          "mt-5 h-12 rounded-2xl items-center justify-center",
          selected ? "bg-primary-500" : "bg-gray-100",
        )}
      >
        <Text
          className={cn(
            "font-black text-xs uppercase tracking-widest",
            selected ? "text-white" : "text-gray-500",
          )}
        >
          {selected ? "Package Selected" : "Select Package"}
        </Text>
      </View>
    </Pressable>
  );
};
