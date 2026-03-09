import { Avatar } from "@/components/ui/Avatar";
import { Typography } from "@/components/ui/Typography";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  Settings,
  Video,
  VideoOff,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function CallScreen() {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleEndCall = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      {/* Remote Video (Fullscreen) */}
      <View className="absolute top-0 left-0 w-full h-full bg-black/80 items-center justify-center">
        {videoOff ? (
          <View className="items-center justify-center">
            <Avatar
              size="xl"
              source={{
                uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
              }}
            />
            <Typography
              variant="heading-lg"
              className="text-white mt-4 font-bold uppercase tracking-widest"
            >
              Connection Live
            </Typography>
            <Typography variant="body-md" className="text-gray-400">
              Waiting for remote feed...
            </Typography>
          </View>
        ) : (
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
            }}
            className="w-full h-full"
            contentFit="cover"
          />
        )}
      </View>

      {/* Local Video (Floating) */}
      <View className="absolute top-12 right-6 w-32 h-44 rounded-2xl bg-gray-800 border-2 border-white/20 overflow-hidden shadow-2xl">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
          }}
          className="w-full h-full"
          contentFit="cover"
        />
        <View className="absolute bottom-2 left-2 px-1 py-0.5 bg-black/30 rounded">
          <Typography
            variant="caption"
            className="text-white text-[8px] font-bold"
          >
            INMATE FEED
          </Typography>
        </View>
      </View>

      {/* Top Banner */}
      <SafeAreaView className="flex-1 items-center">
        <View className="mt-8 px-6 py-2 bg-black/40 rounded-full border border-white/10 flex-row items-center">
          <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
          <Typography variant="body-sm" className="text-white font-semibold">
            REC • {formatTime(timeElapsed)}
          </Typography>
        </View>
      </SafeAreaView>

      {/* Bottom Controls */}
      <View className="absolute bottom-10 left-0 right-0 px-8 pb-8">
        <View className="bg-black/60 rounded-3xl p-6 border border-white/10 flex-row items-center justify-between shadow-2xl backdrop-blur-3xl backdrop-blur-md">
          <View className="flex-row items-center space-x-6 gap-6">
            <TouchableOpacity
              onPress={() => setMuted(!muted)}
              className={cn(
                "p-4 rounded-full",
                muted ? "bg-red-500" : "bg-white/10",
              )}
            >
              {muted ? (
                <MicOff size={24} color="white" />
              ) : (
                <Mic size={24} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVideoOff(!videoOff)}
              className={cn(
                "p-4 rounded-full",
                videoOff ? "bg-red-500" : "bg-white/10",
              )}
            >
              {videoOff ? (
                <VideoOff size={24} color="white" />
              ) : (
                <Video size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleEndCall}
            className="p-5 bg-secondary-red rounded-2xl shadow-xl shadow-red-900/50"
          >
            <PhoneOff size={32} color="white" />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-6 gap-6">
            <TouchableOpacity className="p-4 rounded-full bg-white/10">
              <MessageSquare size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 rounded-full bg-white/10">
              <Settings size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// Reuse cn from another file if possible, or define here if strictly needed
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
