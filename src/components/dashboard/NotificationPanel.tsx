import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Info,
  X,
} from "lucide-react-native";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "alert" | "update";
  time: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Call Reminder",
    message: "Your call with John Doe starts in 15 minutes.",
    type: "reminder",
    time: "5m ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Low Balance",
    message: "Your minute balance is below 15 minutes. Please recharge.",
    type: "alert",
    time: "1h ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Approval Update",
    message: "Your visitor application for Sandile Zulu has been approved.",
    type: "update",
    time: "2h ago",
    isRead: true,
  },
];

export const NotificationPanel = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationPress = (id: string) => {
    markAsRead(id);
    setIsOpen(false);
    router.push("/profile");
  };

  if (isLoading) {
    return <Skeleton variant="circle" width={40} height={40} />;
  }

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        className="relative p-2 rounded-full active:bg-gray-100 dark:active:bg-gray-800"
      >
        <Bell size={24} color="#374151" strokeWidth={2} />
        {unreadCount > 0 && (
          <View className="absolute top-1 right-1 bg-red-500 min-w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white dark:border-gray-900">
            <Text className="text-white text-[9px] font-black">
              {unreadCount}
            </Text>
          </View>
        )}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-4">
          <View className="bg-white dark:bg-gray-900 w-full max-h-[80%] rounded-[32px] overflow-hidden">
            {/* Header */}
            <View className="flex-row justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
              <View className="flex-row items-center">
                <Text className="text-gray-900 dark:text-gray-100 font-black text-xl uppercase tracking-widest">
                  Notifications
                </Text>
                <View className="ml-3 bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                  <Text className="text-primary-600 dark:text-primary-400 text-[10px] font-black">
                    {unreadCount} New
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full"
              >
                <X size={20} color="#6B7280" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {/* List */}
            <ScrollView className="px-4 py-2">
              {notifications.length === 0 ? (
                <View className="py-20 items-center justify-center">
                  <Info size={48} color="#D1D5DB" />
                  <Text className="mt-4 text-gray-400 font-bold">
                    No notifications yet.
                  </Text>
                </View>
              ) : (
                notifications.map((n) => (
                  <TouchableOpacity
                    key={n.id}
                    onPress={() => handleNotificationPress(n.id)}
                    className={cn(
                      "mb-3 p-4 rounded-2xl flex-row items-start border",
                      n.isRead
                        ? "bg-white dark:bg-gray-900 border-gray-50 dark:border-gray-800 opacity-60"
                        : "bg-primary-50/50 dark:bg-primary-900/10 border-primary-50 dark:border-primary-900/20",
                    )}
                  >
                    <View
                      className={cn(
                        "w-10 h-10 rounded-xl items-center justify-center",
                        n.type === "reminder"
                          ? "bg-amber-100 dark:bg-amber-900/30"
                          : n.type === "alert"
                            ? "bg-red-100 dark:bg-red-900/30"
                            : "bg-green-100 dark:bg-green-900/30",
                      )}
                    >
                      {n.type === "reminder" && (
                        <Clock size={20} color="#F59E0B" />
                      )}
                      {n.type === "alert" && (
                        <AlertTriangle size={20} color="#EF4444" />
                      )}
                      {n.type === "update" && (
                        <CheckCircle size={20} color="#10B981" />
                      )}
                    </View>

                    <View className="flex-1 ml-4">
                      <View className="flex-row justify-between items-start">
                        <Text className="font-black text-gray-900 dark:text-gray-100 text-sm uppercase tracking-tight pr-2">
                          {n.title}
                        </Text>
                        <Text className="text-[9px] text-gray-400 font-bold uppercase">
                          {n.time}
                        </Text>
                      </View>
                      <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-4">
                        {n.message}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>

            {/* Footer */}
            <View className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex-row">
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(false);
                  router.push("/profile");
                }}
                className="flex-1 py-3 items-center border-r border-gray-200 dark:border-gray-700"
              >
                <Text className="text-gray-600 dark:text-gray-400 font-black text-xs uppercase tracking-widest">
                  View All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={markAllAsRead}
                className="flex-1 py-3 items-center"
              >
                <Text className="text-primary-600 dark:text-primary-400 font-black text-xs uppercase tracking-widest">
                  Mark All Read
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
