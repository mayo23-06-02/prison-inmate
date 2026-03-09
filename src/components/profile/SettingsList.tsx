import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  Fingerprint,
  HelpCircle,
  Languages,
  Lock,
  LogOut,
  ShieldCheck,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

export const SettingsList = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [language, setLanguage] = useState("English");

  const textShadow = {
    textShadowColor: "rgba(0, 0, 0, 0.05)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  };

  const SettingItem = ({
    icon: Icon,
    label,
    value,
    onPress,
    isSwitch = false,
    switchValue,
    onSwitchChange,
    danger = false,
  }: any) => (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center p-5 bg-white dark:bg-gray-800 rounded-3xl mb-3 border border-gray-50 dark:border-gray-700 active:bg-gray-50",
        danger && "border-red-50 dark:border-red-900/30",
      )}
    >
      <View
        className={cn(
          "w-10 h-10 rounded-xl items-center justify-center mr-4",
          danger
            ? "bg-red-50 dark:bg-red-900/20"
            : "bg-gray-50 dark:bg-gray-700",
        )}
      >
        <Icon size={22} color={danger ? "#DC2626" : "#4B5563"} />
      </View>
      <View className="flex-1">
        <Text
          className={cn(
            "font-black text-sm uppercase tracking-tight",
            danger ? "text-red-600" : "text-gray-900 dark:text-gray-100",
          )}
          style={textShadow}
        >
          {label}
        </Text>
        {value && (
          <Text className="text-[10px] text-gray-400 font-bold uppercase">
            {value}
          </Text>
        )}
      </View>
      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#E5E7EB", true: "#008400" }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <ChevronRight size={18} color="#D1D5DB" />
      )}
    </Pressable>
  );

  return (
    <View className="px-6 pb-20">
      <Text className="text-gray-400 font-black text-[10px] uppercase tracking-widest ml-1 mb-4">
        Account Settings
      </Text>

      <SettingItem
        icon={Bell}
        label="Push Notifications"
        isSwitch
        switchValue={notifications}
        onSwitchChange={setNotifications}
      />

      <SettingItem
        icon={Fingerprint}
        label="Biometric Login"
        isSwitch
        switchValue={biometrics}
        onSwitchChange={setBiometrics}
      />

      <SettingItem
        icon={Languages}
        label="App Language"
        value={language}
        onPress={() => {}}
      />

      <Text className="text-gray-400 font-black text-[10px] uppercase tracking-widest ml-1 mt-6 mb-4">
        Privacy & Security
      </Text>

      <SettingItem
        icon={ShieldCheck}
        label="Privacy Policy"
        onPress={() => {}}
      />

      <SettingItem icon={Lock} label="Terms Of Service" onPress={() => {}} />

      <SettingItem
        icon={HelpCircle}
        label="Help & Support"
        onPress={() => router.push("/profile")}
      />

      <View className="mt-8">
        <SettingItem icon={LogOut} label="Logout" danger onPress={() => {}} />
        <Text className="text-center text-gray-300 text-[9px] font-black uppercase tracking-widest mt-4">
          H.M.S. Prison Link v1.0.24 (Build 882)
        </Text>
      </View>
    </View>
  );
};
