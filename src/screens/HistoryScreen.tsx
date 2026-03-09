import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { useRouter } from "expo-router";
import {
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  History as HistoryIcon,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
} from "lucide-react-native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const router = useRouter();

  const CALL_LOGS = [
    {
      id: "1",
      visitor: "Siphesihle Dlamini",
      relationship: "Brother",
      date: "Monday, Mar 03",
      time: "2:45 PM",
      duration: "15:23",
      type: "incoming",
      status: "Completed",
      officer: "Officer Khumalo",
      facility: "Matsapha Central",
      device: "Kiosk #14",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
      id: "2",
      visitor: "Tengetile Mamba",
      relationship: "Wife",
      date: "Sunday, Mar 02",
      time: "11:00 AM",
      duration: "00:00",
      type: "missed",
      status: "Missed",
      officer: "Sgt. Mabuza",
      facility: "Mbabane Maximum",
      device: "Tablet #02",
      avatar: null,
    },
    {
      id: "3",
      visitor: "Bongani Simelane",
      relationship: "Attorney",
      date: "Saturday, Mar 01",
      time: "09:15 AM",
      duration: "30:00",
      type: "outgoing",
      status: "Completed",
      officer: "Lt. Zwane",
      facility: "Matsapha Central",
      device: "Booth #08",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    {
      id: "4",
      visitor: "Nomsa Magagula",
      relationship: "Mother",
      date: "Friday, Feb 28",
      time: "4:30 PM",
      duration: "22:15",
      type: "incoming",
      status: "Completed",
      officer: "Officer Shongwe",
      facility: "Manzini Remand",
      device: "Kiosk #05",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: "5",
      visitor: "Sipho Gamedze",
      relationship: "Cousin",
      date: "Thursday, Feb 27",
      time: "1:15 PM",
      duration: "00:00",
      type: "missed",
      status: "Cancelled",
      officer: "Officer Khumalo",
      facility: "Matsapha Central",
      device: "Kiosk #12",
      avatar: null,
    },
    {
      id: "6",
      visitor: "Khanyisile Shongwe",
      relationship: "Sister",
      date: "Wednesday, Feb 26",
      time: "10:00 AM",
      duration: "10:00",
      type: "incoming",
      status: "Completed",
      officer: "Sgt. Mabuza",
      facility: "Big Bend Prison",
      device: "Tablet #05",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  const getTypeIcon = (type: string, status: string) => {
    const isError = status === "Missed" || status === "Cancelled";
    const color = isError ? "#DC2626" : "#008400"; // Red or Green only

    switch (type) {
      case "incoming":
        return <PhoneIncoming size={16} color={color} />;
      case "outgoing":
        return <PhoneOutgoing size={16} color={color} />;
      case "missed":
        return <PhoneMissed size={16} color={color} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-gray-100 bg-white">
        <View className="flex-row items-center space-x-2 gap-3">
          <View className="p-2 bg-primary-50 rounded-xl">
            <HistoryIcon size={22} color="#008400" />
          </View>
          <View>
            <Typography
              variant="heading-lg"
              className="text-gray-900 font-black uppercase tracking-tighter"
            >
              Call Log
            </Typography>
            <Typography
              variant="caption"
              className="text-gray-500 font-bold uppercase text-[9px]"
            >
              History & Recorded Sessions
            </Typography>
          </View>
        </View>
        <TouchableOpacity className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <Filter size={18} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      >
        {CALL_LOGS.map((log) => (
          <Card
            key={log.id}
            className="mb-5 shadow-none border border-gray-100 rounded-[24px] overflow-hidden"
          >
            <CardContent className="p-0">
              <View className="p-4 flex-row items-center border-b border-gray-50">
                <Avatar
                  source={log.avatar ? { uri: log.avatar } : undefined}
                  initials={
                    log.avatar
                      ? undefined
                      : log.visitor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                  }
                  size="lg"
                  className="mr-4 ring-2 ring-gray-50"
                />
                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <Typography
                      variant="heading-md"
                      className="text-gray-900 font-black uppercase text-sm"
                    >
                      {log.visitor}
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="text-gray-400 font-bold text-[10px]"
                    >
                      {log.time}
                    </Typography>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <View className="mr-2">
                      {getTypeIcon(log.type, log.status)}
                    </View>
                    <Typography
                      variant="caption"
                      className="text-gray-500 font-bold italic text-[11px]"
                    >
                      {log.relationship} • {log.facility}
                    </Typography>
                  </View>
                </View>
              </View>

              <View className="bg-gray-50/50 p-4 flex-row justify-between items-center">
                <View className="flex-row items-center space-x-4 gap-4">
                  <View className="flex-row items-center">
                    <Calendar size={12} color="#9CA3AF" />
                    <Typography
                      variant="body-sm"
                      className="text-gray-600 font-bold ml-1.5 text-[11px]"
                    >
                      {log.date}
                    </Typography>
                  </View>
                  <View className="flex-row items-center">
                    <Clock size={12} color="#9CA3AF" />
                    <Typography
                      variant="body-sm"
                      className="text-gray-600 font-bold ml-1.5 text-[11px]"
                    >
                      {log.status === "Missed" || log.status === "Cancelled"
                        ? "Failed"
                        : log.duration}
                    </Typography>
                  </View>
                </View>

                <Badge
                  variant={log.status === "Completed" ? "success" : "error"}
                  label={log.status}
                />
              </View>

              {/* Enhanced Data Row */}
              <View className="px-4 py-3 flex-row border-t border-gray-50 bg-white items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center">
                    <ShieldCheck size={12} color="#008400" />
                    <Typography
                      variant="caption"
                      className="ml-1 text-gray-500 font-bold text-[10px]"
                    >
                      {log.officer}
                    </Typography>
                  </View>
                  <View className="flex-row items-center">
                    <Smartphone size={12} color="#9CA3AF" />
                    <Typography
                      variant="caption"
                      className="ml-1 text-gray-500 font-bold text-[10px]"
                    >
                      {log.device}
                    </Typography>
                  </View>
                </View>

                {(log.status === "Missed" || log.status === "Cancelled") && (
                  <TouchableOpacity
                    className="flex-row items-center bg-red-50 px-3 py-1.5 rounded-full border border-red-100"
                    onPress={() =>
                      router.push({
                        pathname: "/schedule" as any,
                        params: { inmateName: log.visitor },
                      })
                    }
                  >
                    <RefreshCcw size={10} color="#DC2626" />
                    <Typography
                      variant="caption"
                      className="text-red-600 font-black ml-1 uppercase text-[9px]"
                    >
                      Reschedule
                    </Typography>
                  </TouchableOpacity>
                )}

                {log.status === "Completed" && (
                  <TouchableOpacity className="p-1">
                    <ChevronRight size={16} color="#D1D5DB" />
                  </TouchableOpacity>
                )}
              </View>
            </CardContent>
          </Card>
        ))}

        <View className="mt-4 mb-10 items-center justify-center">
          <Typography
            variant="caption"
            className="text-gray-400 font-bold italic"
          >
            End of Call History List
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
