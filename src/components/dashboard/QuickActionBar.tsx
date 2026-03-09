import { Skeleton } from "@/components/ui/Skeleton";
import { useRouter } from "expo-router";
import {
  Calendar,
  Clock,
  CreditCard,
  MessageSquare,
} from "lucide-react-native";
import React from "react";
import { Animated, Pressable, Text, View } from "react-native";

interface QuickActionProps {
  label: string;
  icon: React.ElementType;
  onPress: () => void;
  isLoading?: boolean;
}

const QuickActionButton = ({
  label,
  icon: Icon,
  onPress,
  isLoading,
}: QuickActionProps) => {
  const [scale] = React.useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (isLoading) {
    return (
      <View className="items-center space-y-2">
        <Skeleton variant="rounded" width={60} height={60} />
        <Skeleton variant="rect" width={50} height={12} />
      </View>
    );
  }

  return (
    <View className="items-center">
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl items-center justify-center border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-700"
        >
          <Icon size={28} color="#008400" strokeWidth={2} />
        </Pressable>
      </Animated.View>
      <Text className="mt-2 text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">
        {label}
      </Text>
    </View>
  );
};

export const QuickActionBar = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const router = useRouter();
  const actions = [
    {
      label: "Schedule",
      icon: Calendar,
      onPress: () => router.push("/schedule" as any),
    },
    {
      label: "History",
      icon: Clock,
      onPress: () => router.push("/history" as any),
    },
    {
      label: "Recharge",
      icon: CreditCard,
      onPress: () => router.push("/recharge" as any),
    },
    {
      label: "Support",
      icon: MessageSquare,
      onPress: () => router.push("/profile" as any),
    },
  ];

  return (
    <View className="flex-row justify-around items-center py-6 px-4">
      {actions.map((action, index) => (
        <QuickActionButton key={index} {...action} isLoading={isLoading} />
      ))}
    </View>
  );
};
