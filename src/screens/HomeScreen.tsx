import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Calendar, LogOut, Video } from "lucide-react-native";
import React from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// New Dashboard Components
import { ApprovedContactList } from "@/components/dashboard/ApprovedContactList";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { QuickActionBar } from "@/components/dashboard/QuickActionBar";

const { width } = Dimensions.get("window");

const CAROUSEL_IMAGES = [
  require("../assets/images/dashboard/bg11.jpg"),
  require("../assets/images/dashboard/bg31.jpg"),
  require("../assets/images/dashboard/bg41.jpg"),
  require("../assets/images/dashboard/bg51.jpg"),
];

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/login");
  };

  const UPCOMING_CALLS = [
    {
      id: "1",
      visitor: "Thabo Simelane",
      relationship: "Brother",
      date: "Today, 2:00 PM",
      duration: "15 mins",
      status: "Ready",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
      id: "2",
      visitor: "Nomsa Mamba",
      relationship: "Wife",
      date: "Tomorrow, 10:30 AM",
      duration: "30 mins",
      status: "Scheduled",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header content with extra padding if needed */}
        <View className="px-6 py-6 flex-row justify-between items-center">
          <View>
            <Typography
              variant="body-sm"
              className="text-gray-500 font-bold uppercase text-[10px] tracking-widest"
            >
              Sawubona,
            </Typography>
            <Typography
              variant="heading-lg"
              className="text-primary-600 font-black uppercase tracking-tighter"
            >
              Inmate #2024/0882
            </Typography>
          </View>
          <View className="flex-row items-center space-x-3 gap-2">
            <NotificationPanel />
            <TouchableOpacity
              onPress={handleLogout}
              className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full"
            >
              <LogOut size={20} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Section */}
        <BalanceCard />

        {/* Quick Actions */}
        <QuickActionBar />

        {/* Image Carousel Announcements */}
        <View className="mt-2 px-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="rounded-3xl h-48 overflow-hidden"
          >
            {CAROUSEL_IMAGES.map((img, idx) => (
              <View
                key={idx}
                style={{ width: width - 48 }}
                className="h-48 rounded-3xl overflow-hidden mr-4"
              >
                <Image
                  source={img}
                  className="w-full h-full"
                  contentFit="cover"
                  transition={500}
                />
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
                  <Typography
                    variant="heading-md"
                    className="text-white font-bold uppercase tracking-tight"
                  >
                    Correctional Announcements
                  </Typography>
                  <Typography variant="body-sm" className="text-gray-200">
                    Stay updated with the latest facility news.
                  </Typography>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Calls Section */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Typography
              variant="heading-lg"
              className="text-gray-900 font-black uppercase tracking-widest"
            >
              Scheduled Calls
            </Typography>
            <TouchableOpacity>
              <Typography
                variant="body-sm"
                className="text-primary-600 font-black uppercase text-[10px]"
              >
                View All
              </Typography>
            </TouchableOpacity>
          </View>

          {UPCOMING_CALLS.map((call) => (
            <Card
              key={call.id}
              className="mb-4 shadow-xl border-l-[6px] border-primary-500 overflow-hidden rounded-3xl"
            >
              <CardContent className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center flex-1">
                  <Avatar
                    source={{ uri: call.avatar }}
                    size="lg"
                    className="mr-4 ring-2 ring-primary-50"
                  />
                  <View>
                    <Typography
                      variant="heading-md"
                      className="text-gray-900 font-black uppercase text-sm"
                    >
                      {call.visitor}
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="text-gray-500 mb-1 font-bold italic text-[11px]"
                    >
                      {call.relationship}
                    </Typography>
                    <View className="flex-row items-center">
                      <Calendar size={12} color="#6B7280" className="mr-1" />
                      <Typography
                        variant="body-sm"
                        className="text-gray-600 font-bold text-[11px]"
                      >
                        {call.date}
                      </Typography>
                    </View>
                  </View>
                </View>
                <View className="items-end gap-2">
                  <Badge
                    variant={call.status === "Ready" ? "success" : "primary"}
                    label={call.status}
                  />
                  {call.status === "Ready" && (
                    <Button
                      size="sm"
                      label="JOIN"
                      variant="primary"
                      icon={<Video size={16} color="white" />}
                      onPress={() =>
                        router.push({
                          pathname: "/call/" as any,
                          params: { inmateName: call.visitor },
                        })
                      }
                    />
                  )}
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Approved Contacts Section */}
        <View className="px-6 mt-6 pb-12">
          <View className="flex-row justify-between items-center mb-4">
            <Typography
              variant="heading-lg"
              className="text-gray-900 font-black uppercase tracking-widest"
            >
              Approved Visitors
            </Typography>
          </View>
          <ApprovedContactList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
