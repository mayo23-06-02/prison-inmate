import { Skeleton } from "@/components/ui/Skeleton";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Phone,
  Sparkles,
  Video,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_INMATES = [
  { name: "Sipho Dlamini", id: "INM-SZ-2025-0442", avatar: "SD" },
  { name: "Tengetile Gamedze", id: "INM-SZ-2024-0761", avatar: "TG" },
  { name: "Menzi Magagula", id: "INM-SZ-2025-0440", avatar: "MM" },
  { name: "Nomsa Mamba", id: "INM-SZ-2024-0882", avatar: "NM" },
];

const MOCK_SLOTS = [
  { time: "09:00 AM", status: "booked" },
  { time: "09:30 AM", status: "blackout" },
  { time: "10:00 AM", status: "available" },
  { time: "10:30 AM", status: "available" },
  { time: "11:00 AM", status: "booked" },
  { time: "11:30 AM", status: "available" },
  { time: "01:00 PM", status: "available" },
  { time: "01:30 PM", status: "available" },
];

export const ScheduleCallScreen = ({
  isLoading = false,
  initialInmateName,
}: {
  isLoading?: boolean;
  initialInmateName?: string;
}) => {
  const router = useRouter();
  const [selectedInmate, setSelectedInmate] = useState(
    MOCK_INMATES.find((i) => i.name === initialInmateName) || MOCK_INMATES[0],
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [callType, setCallType] = useState<"video" | "voice">("video");
  const [agreed, setAgreed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInmateDropdown, setShowInmateDropdown] = useState(false);

  React.useEffect(() => {
    if (initialInmateName) {
      const inmate = MOCK_INMATES.find((i) => i.name === initialInmateName);
      if (inmate) setSelectedInmate(inmate);
    }
  }, [initialInmateName]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white dark:bg-gray-950 p-6">
        <Skeleton variant="rect" width="60%" height={30} className="mb-8" />
        <Skeleton
          variant="rect"
          width="100%"
          height={60}
          className="rounded-2xl mb-6"
        />
        <Skeleton variant="rect" width="40%" height={20} className="mb-4" />
        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              variant="rect"
              width="48%"
              height={50}
              className="rounded-xl mb-4"
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-gray-950"
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Typography
          variant="heading-lg"
          className="text-gray-900 dark:text-gray-100 font-black uppercase tracking-widest mb-6"
        >
          Schedule Call
        </Typography>

        {/* Inmate Selector */}
        <View className="mb-6 z-50">
          <Typography className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">
            Choose Recipient
          </Typography>
          <Pressable
            onPress={() => setShowInmateDropdown(!showInmateDropdown)}
            className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary-500 rounded-xl items-center justify-center">
                <Typography className="text-white font-black text-xs">
                  {selectedInmate.avatar}
                </Typography>
              </View>
              <View className="ml-3">
                <Typography
                  variant="body-md"
                  className="text-gray-900 dark:text-gray-100 font-bold"
                >
                  {selectedInmate.name}
                </Typography>
                <Typography className="text-gray-400 text-[10px] font-bold">
                  ID: {selectedInmate.id}
                </Typography>
              </View>
            </View>
            <ChevronDown
              size={20}
              color="#6B7280"
              style={{
                transform: [{ rotate: showInmateDropdown ? "180deg" : "0deg" }],
              }}
            />
          </Pressable>

          {showInmateDropdown && (
            <View className="absolute top-[85px] left-0 right-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
              {MOCK_INMATES.map((inmate) => (
                <TouchableOpacity
                  key={inmate.id}
                  onPress={() => {
                    setSelectedInmate(inmate);
                    setShowInmateDropdown(false);
                  }}
                  className={cn(
                    "p-4 border-b border-gray-50 dark:border-gray-800 flex-row items-center",
                    selectedInmate.id === inmate.id
                      ? "bg-primary-50 dark:bg-primary-900/10"
                      : "",
                  )}
                >
                  <View className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg items-center justify-center mr-3">
                    <Typography className="text-primary-700 dark:text-primary-400 font-bold text-[10px]">
                      {inmate.avatar}
                    </Typography>
                  </View>
                  <Typography
                    variant="body-md"
                    className="text-gray-900 dark:text-gray-100 font-bold"
                  >
                    {inmate.name}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date Selector Mock */}
        <View className="mb-6">
          <Typography className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">
            Pick Date (March 2026)
          </Typography>
          <View className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <View className="flex-row justify-between items-center mb-4">
              <Typography
                variant="label"
                className="text-gray-900 dark:text-gray-100 font-black uppercase"
              >
                March 2026
              </Typography>
              <View className="flex-row gap-4">
                <ChevronDown
                  size={16}
                  color="#9CA3AF"
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
                <ChevronDown
                  size={16}
                  color="#9CA3AF"
                  style={{ transform: [{ rotate: "-90deg" }] }}
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <View key={i} className="items-center w-8">
                  <Typography className="text-gray-400 text-[9px] font-black mb-1">
                    {day}
                  </Typography>
                  <View
                    className={cn(
                      "w-8 h-8 items-center justify-center rounded-lg",
                      i === 4 ? "bg-primary-500 shadow-md" : "",
                    )}
                  >
                    <Typography
                      className={cn(
                        "font-bold text-xs",
                        i === 4
                          ? "text-white"
                          : "text-gray-900 dark:text-gray-100",
                        i < 2 ? "opacity-20" : "",
                      )}
                    >
                      {10 + i}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Time Slots */}
        <View className="mb-6">
          <View className="flex-row justify-between items-end mb-2 ml-1">
            <Typography className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
              Available Windows
            </Typography>
            <View className="flex-row items-center bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-full border border-primary-100 dark:border-primary-900/30">
              <Sparkles size={10} color="#008400" />
              <Typography className="text-primary-700 dark:text-primary-400 font-black text-[8px] ml-1 uppercase">
                Smart Match Active
              </Typography>
            </View>
          </View>

          {/* Optimal Window Insight */}
          <View className="mb-4 bg-primary-50 px-4 py-3 rounded-2xl border border-primary-100 dark:border-primary-900/30 flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-3">
              <Clock size={16} color="#008400" />
            </View>
            <View className="flex-1">
              <Typography className="text-primary-800 dark:text-primary-200 font-black text-[10px] uppercase tracking-tight">
                Recommended Window
              </Typography>
              <Typography className="text-primary-700 dark:text-primary-400 text-[10px] font-medium leading-4">
                Connection quality is 85% higher between 10 AM - 11 AM due to
                low facility bandwidth usage.
              </Typography>
            </View>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {MOCK_SLOTS.map((slot) => (
              <Pressable
                key={slot.time}
                disabled={slot.status !== "available"}
                onPress={() => setSelectedSlot(slot.time)}
                className={cn(
                  "w-[48%] mb-3 p-3 rounded-xl border flex-row items-center justify-center relative",
                  slot.status === "available"
                    ? selectedSlot === slot.time
                      ? "bg-primary-500 border-primary-500 shadow-lg"
                      : "bg-white dark:bg-gray-900 border-primary-100 dark:border-gray-800"
                    : slot.status === "booked"
                      ? "bg-gray-100 dark:bg-gray-900 border-gray-50 dark:border-gray-800 opacity-50"
                      : "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20",
                )}
              >
                {slot.time === "10:00 AM" && (
                  <View className="absolute -top-2 -right-1 bg-amber-400 px-1.5 py-0.5 rounded-md shadow-sm border border-amber-500">
                    <Typography className="text-[7px] font-black text-white uppercase">
                      BEST
                    </Typography>
                  </View>
                )}
                <Typography
                  className={cn(
                    "font-black text-[11px] uppercase tracking-tight",
                    selectedSlot === slot.time
                      ? "text-white"
                      : slot.status === "available"
                        ? "text-primary-700 dark:text-primary-400"
                        : slot.status === "booked"
                          ? "text-gray-400"
                          : "text-red-700 dark:text-red-400",
                  )}
                >
                  {slot.time}
                </Typography>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Call Type */}
        <View className="mb-6">
          <Typography className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">
            Communication Mode
          </Typography>
          <View className="flex-row space-x-3 gap-3">
            <Pressable
              onPress={() => setCallType("video")}
              className={cn(
                "flex-1 flex-row items-center justify-center p-4 rounded-2xl border",
                callType === "video"
                  ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800",
              )}
            >
              <Video
                size={20}
                color={callType === "video" ? "#008400" : "#9CA3AF"}
              />
              <Typography
                className={cn(
                  "ml-2 font-black text-xs uppercase",
                  callType === "video"
                    ? "text-primary-700 dark:text-primary-400"
                    : "text-gray-400",
                )}
              >
                Video
              </Typography>
            </Pressable>
            <Pressable
              onPress={() => setCallType("voice")}
              className={cn(
                "flex-1 flex-row items-center justify-center p-4 rounded-2xl border",
                callType === "voice"
                  ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800",
              )}
            >
              <Phone
                size={20}
                color={callType === "voice" ? "#008400" : "#9CA3AF"}
              />
              <Typography
                className={cn(
                  "ml-2 font-black text-xs uppercase",
                  callType === "voice"
                    ? "text-primary-700 dark:text-primary-400"
                    : "text-gray-400",
                )}
              >
                Voice
              </Typography>
            </Pressable>
          </View>
        </View>

        {/* Terms */}
        <Pressable
          onPress={() => setAgreed(!agreed)}
          className="flex-row items-start mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20"
        >
          <View
            className={cn(
              "w-5 h-5 rounded border-2 items-center justify-center",
              agreed ? "bg-amber-600 border-amber-600" : "border-amber-300",
            )}
          >
            {agreed && (
              <CheckCircle size={14} color="#FFFFFF" strokeWidth={3} />
            )}
          </View>
          <Typography className="flex-1 ml-3 text-amber-900 dark:text-amber-200 text-[10px] font-bold leading-4">
            Sawubona. By scheduling this call, I acknowledge that all
            communications are recorded for security. I agree to the Swaziland
            Correctional Services Portal use terms.
          </Typography>
        </Pressable>

        {/* Schedule Button */}
        <TouchableOpacity
          onPress={() => setShowConfirmation(true)}
          disabled={!selectedSlot || !agreed}
          className={cn(
            "rounded-full overflow-hidden shadow-xl",
            !selectedSlot || !agreed ? "opacity-50" : "active:scale-[0.98]",
          )}
        >
          <LinearGradient
            colors={["#00A300", "#008400", "#006600"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-16 items-center justify-center"
          >
            <Typography className="text-white font-black text-lg uppercase tracking-[4px]">
              Confirm Call
            </Typography>
          </LinearGradient>
        </TouchableOpacity>

        <View className="h-10" />

        {/* Confirmation Modal */}
        <Modal visible={showConfirmation} transparent animationType="fade">
          <View className="flex-1 bg-black/60 justify-center items-center px-6">
            <View className="bg-white dark:bg-gray-950 w-full p-8 rounded-[40px] items-center border border-gray-100 dark:border-gray-800">
              <View className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full items-center justify-center mb-6">
                <CheckCircle size={40} color="#008400" />
              </View>
              <Typography
                variant="heading-md"
                className="text-gray-900 dark:text-gray-100 font-black uppercase text-center"
              >
                Call Successfully Set!
              </Typography>
              <Typography
                variant="body-sm"
                className="text-gray-500 dark:text-gray-400 text-center mt-3 font-bold leading-5"
              >
                Your session with {selectedInmate.name} is scheduled for
                Thursday, March 12 at {selectedSlot}. Please arrive 10 minutes
                early.
              </Typography>

              <TouchableOpacity
                onPress={() => {
                  setShowConfirmation(false);
                  router.replace("/(tabs)/dashboard");
                }}
                className="mt-10 w-full rounded-2xl overflow-hidden shadow-lg active:scale-95"
              >
                <LinearGradient
                  colors={["#00A300", "#008400"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="py-4 items-center"
                >
                  <Typography className="text-white font-black uppercase tracking-[3px]">
                    Siyabonga (Finish)
                  </Typography>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
