import { Skeleton } from "@/components/ui/Skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { CreditCard, Info } from "lucide-react-native";
import React from "react";
import { Animated, Pressable, Text, View } from "react-native";

interface BalanceCardProps {
  isLoading?: boolean;
}

const MOCK_DATA = {
  balance: 45,
  total: 180,
  usagePercent: 75,
  expiryDays: 2,
};

export const BalanceCard = ({ isLoading = false }: BalanceCardProps) => {
  const router = useRouter();
  const [scale] = React.useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
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
      <View className="mx-4 my-3 p-6 rounded-3xl bg-gray-100 dark:bg-gray-800 h-48">
        <Skeleton variant="rect" width="60%" height={20} className="mb-4" />
        <Skeleton variant="rect" width="40%" height={40} className="mb-6" />
        <Skeleton
          variant="rect"
          width="100%"
          height={10}
          className="rounded-full mb-4"
        />
        <View className="flex-row justify-between">
          <Skeleton variant="rect" width="30%" height={20} />
          <Skeleton
            variant="rect"
            width="40%"
            height={40}
            className="rounded-xl"
          />
        </View>
      </View>
    );
  }

  const isLowBalance = MOCK_DATA.balance < 15;

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className="mx-4 my-3 overflow-hidden rounded-3xl"
    >
      <LinearGradient
        colors={["#008400", "#006600"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-white/80 font-bold uppercase tracking-widest text-[10px]">
              Current Balance
            </Text>
            <View className="flex-row items-baseline mt-1">
              <Text className="text-white text-5xl font-black">
                {MOCK_DATA.balance}
              </Text>
              <Text className="text-white/90 text-xl font-bold ml-1.5 uppercase">
                Min
              </Text>
            </View>
          </View>

          {isLowBalance && (
            <View className="bg-red-500/90 px-3 py-1.5 rounded-full flex-row items-center border border-white/20">
              <Info size={14} color="#FFFFFF" strokeWidth={3} />
              <Text className="text-white text-[10px] font-black ml-1 uppercase">
                Low Balance
              </Text>
            </View>
          )}
        </View>

        {/* Progress Bar Container */}
        <View className="mt-8">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white/70 text-xs font-bold">
              Usage Progress
            </Text>
            <Text className="text-white/90 text-xs font-black">
              {MOCK_DATA.usagePercent}% Used
            </Text>
          </View>
          <View className="h-2.5 bg-black/20 rounded-full overflow-hidden border border-white/10">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${MOCK_DATA.usagePercent}%` }}
            />
          </View>
        </View>

        {/* Expiry and Actions */}
        <View className="flex-row justify-between items-center mt-8 pt-4 border-t border-white/10">
          <View>
            <Text className="text-white/60 text-[10px] uppercase font-bold">
              Expires In
            </Text>
            <Text className="text-white font-bold text-sm">
              {MOCK_DATA.expiryDays} Days Left
            </Text>
          </View>

          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => router.push("/recharge")}
            className="flex-row items-center bg-white py-2.5 px-5 rounded-2xl active:opacity-90"
          >
            <CreditCard size={18} color="#008400" strokeWidth={2.5} />
            <Text className="text-primary-600 font-black ml-2 text-xs uppercase tracking-tight">
              Add Minutes
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {isLowBalance && (
        <View className="bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-900/30 p-3 items-center">
          <Text className="text-red-600 dark:text-red-400 text-[11px] font-bold italic">
            ⚠️ Recharge soon to avoid call disconnection
          </Text>
        </View>
      )}
    </Animated.View>
  );
};
