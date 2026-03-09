import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { Calendar, Phone, Video } from "lucide-react-native";
import React from "react";
import { Animated, Pressable, Text, View } from "react-native";

export interface ContactData {
  id: string;
  name: string;
  inmateId: string;
  status: "Available" | "Busy" | "Offline";
  avatar: string;
  nextCallTime?: string;
}

interface ApprovedContactCardProps {
  contact?: ContactData;
  isLoading?: boolean;
}

const MOCK_CONTACT: ContactData = {
  id: "1",
  name: "Sipho Dlamini",
  inmateId: "HMS-26804",
  status: "Available",
  avatar: "SD",
  nextCallTime: "Today, 4:30 PM",
};

const CONTACTS_LIST: ContactData[] = [
  MOCK_CONTACT,
  {
    id: "2",
    name: "Tengetile Gamedze",
    inmateId: "HMS-76122",
    status: "Busy",
    avatar: "TG",
    nextCallTime: "Tomorrow, 9:00 AM",
  },
  {
    id: "3",
    name: "Menzi Magagula",
    inmateId: "HMS-44021",
    status: "Offline",
    avatar: "MM",
    nextCallTime: "Mar 15, 12:00 PM",
  },
];

export const ApprovedContactCard = ({
  contact = MOCK_CONTACT,
  isLoading = false,
}: ApprovedContactCardProps) => {
  const [scale] = React.useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
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
      <View className="mx-4 my-2 p-5 bg-white dark:bg-gray-800 rounded-3xl flex-row items-center border border-gray-100 dark:border-gray-700">
        <Skeleton variant="rounded" width={60} height={60} />
        <View className="flex-1 ml-4 space-y-2">
          <Skeleton variant="rect" width="60%" height={20} />
          <Skeleton variant="rect" width="40%" height={14} />
          <Skeleton variant="rect" width="30%" height={12} />
        </View>
        <Skeleton variant="rounded" width={44} height={44} className="ml-2" />
      </View>
    );
  }

  const statusColors = {
    Available: "bg-green-500",
    Busy: "bg-amber-500",
    Offline: "bg-gray-400",
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }} className="mx-4 my-2">
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 flex-row items-center"
      >
        {/* Avatar Section */}
        <View className="relative">
          <View className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl items-center justify-center border border-primary-100 dark:border-primary-800">
            <Text className="text-primary-600 dark:text-primary-400 text-xl font-black">
              {contact.avatar}
            </Text>
          </View>
          <View
            className={cn(
              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800",
              statusColors[contact.status],
            )}
          />
        </View>

        {/* Info Section */}
        <View className="flex-1 ml-4 pr-1">
          <View className="flex-row items-center justify-between mb-0.5">
            <Text
              className="font-black text-gray-900 dark:text-gray-100 text-lg uppercase tracking-tight"
              numberOfLines={1}
            >
              {contact.name}
            </Text>
          </View>

          <Text className="text-gray-400 dark:text-gray-500 font-bold text-xs">
            ID: {contact.inmateId}
          </Text>

          <View className="flex-row items-center mt-2 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-md self-start">
            <Calendar
              size={12}
              color={contact.status === "Available" ? "#008400" : "#6B7280"}
            />
            <Text className="text-gray-600 dark:text-gray-400 text-[10px] ml-1 font-bold">
              Next: {contact.nextCallTime || "Not scheduled"}
            </Text>
          </View>
        </View>

        {/* Actions - Swipe Actions Placeholder logic could be here, but using buttons for UI */}
        <View className="flex-row space-x-2">
          <View className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 items-center justify-center">
            <Video size={20} color="#008400" />
          </View>
          <View className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 items-center justify-center">
            <Phone size={20} color="#6B7280" />
          </View>
        </View>
      </Pressable>

      {/* Swipe Actions Instruction Placeholder */}
      <View className="flex-row justify-center mt-1">
        <Text className="text-[9px] text-gray-300 dark:text-gray-600 uppercase font-black tracking-tighter">
          Swipe left for quick actions
        </Text>
      </View>
    </Animated.View>
  );
};

export const ApprovedContactList = ({
  items = CONTACTS_LIST,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <View>
        {[1, 2, 3].map((i) => (
          <ApprovedContactCard key={i} isLoading={true} />
        ))}
      </View>
    );
  }

  return (
    <View>
      {items.map((item) => (
        <ApprovedContactCard key={item.id} contact={item} />
      ))}
    </View>
  );
};
