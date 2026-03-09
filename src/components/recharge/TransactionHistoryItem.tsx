import { cn } from "@/lib/utils";
import { Download } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface Transaction {
  id: string;
  date: string;
  packageName: string;
  amount: string;
  minutesAdded: number;
  status: "Completed" | "Pending" | "Failed";
}

export const TransactionHistoryItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Failed: "bg-red-100 text-red-700",
  };

  const textShadow = {
    textShadowColor: "rgba(0, 0, 0, 0.05)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  };

  return (
    <View className="mb-4 bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700 flex-row items-center">
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="text-gray-900 dark:text-gray-100 font-black text-sm uppercase tracking-tight"
            style={textShadow}
          >
            {transaction.packageName}
          </Text>
          <View
            className={cn(
              "px-2 py-0.5 rounded-lg",
              statusColors[transaction.status].split(" ")[0],
            )}
          >
            <Text
              className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                statusColors[transaction.status].split(" ")[1],
              )}
            >
              {transaction.status}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-400 text-[10px] font-bold uppercase">
              {transaction.date}
            </Text>
            <Text className="text-primary-600 font-black text-lg mt-0.5">
              SZL {transaction.amount}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-gray-400 text-[10px] font-bold uppercase">
              Minutes Added
            </Text>
            <Text className="text-gray-900 dark:text-gray-100 font-black text-base">
              +{transaction.minutesAdded}
            </Text>
          </View>
        </View>
      </View>

      <View className="ml-5 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
        <Download size={20} color="#9CA3AF" />
      </View>
    </View>
  );
};
