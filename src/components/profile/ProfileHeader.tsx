import { LinearGradient } from "expo-linear-gradient";
import { BadgeCheck, Pencil } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ProfileHeader = () => {
  return (
    <View className="mb-6">
      <LinearGradient
        colors={["#008400", "#004D00"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200 }}
      />

      <View className="items-center mt-12 px-6">
        {/* Avatar Container */}
        <View className="relative">
          <View className="w-32 h-32 bg-white rounded-[48px] items-center justify-center border-4 border-white">
            <Text className="text-primary-600 font-black text-5xl">MD</Text>
          </View>
          <View className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full">
            <BadgeCheck size={28} color="#008400" />
          </View>
        </View>

        <View className="mt-6 items-center">
          <Text className="text-white font-black text-3xl uppercase tracking-tighter">
            Mayibongwe Dlamini
          </Text>
          <View className="flex-row items-center mt-1 bg-white/20 px-3 py-1 rounded-full border border-white/30">
            <Text className="text-white font-black text-[10px] uppercase tracking-widest">
              VIS-2025-001 • VERIFIED
            </Text>
          </View>
        </View>

        <TouchableOpacity className="mt-8 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 flex-row items-center backdrop-blur-md">
          <Pencil size={18} color="#FFFFFF" />
          <Text className="text-white font-black text-xs uppercase tracking-widest ml-2">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Overlay */}
      <View className="flex-row justify-between bg-white dark:bg-gray-800 mx-6 mt-10 p-6 rounded-[32px] border border-gray-50 dark:border-gray-700">
        <View className="items-center flex-1">
          <Text className="text-gray-900 dark:text-gray-100 font-black text-xl">
            12
          </Text>
          <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest mt-1">
            Calls
          </Text>
        </View>
        <View className="w-[1px] h-8 bg-gray-100 dark:bg-gray-700" />
        <View className="items-center flex-1">
          <Text className="text-gray-900 dark:text-gray-100 font-black text-xl">
            345
          </Text>
          <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest mt-1">
            Mins
          </Text>
        </View>
        <View className="w-[1px] h-8 bg-gray-100 dark:bg-gray-700" />
        <View className="items-center flex-1">
          <Text className="text-gray-900 dark:text-gray-100 font-black text-xl">
            3
          </Text>
          <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest mt-1">
            Contacts
          </Text>
        </View>
      </View>
    </View>
  );
};
