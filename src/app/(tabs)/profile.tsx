import {
  ProfileHeaderCard,
  ProfileMenuItem,
  ProfileMenuSection,
  ProfileStatCard,
} from "@/components/profile";
import { Button, Typography } from "@/components/ui";
import { useRouter } from "expo-router";
import {
  CreditCard,
  Fingerprint,
  HelpCircle,
  History,
  Info,
  Key,
  MessageSquare,
  ShieldCheck,
  Timer,
  User,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_INMATE = {
  name: "Sinethemba Gamedze",
  id: "INM-SZ-2025-0442",
  verified: true,
  totalCalls: 42,
  minutesUsed: 520,
  balance: "SZL 124.50",
  avatarInitials: "SG",
  facility: "Matsapha Central Prison",
};

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out from H.M.S. Inmate Portal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => router.replace("/login"),
        },
      ],
    );
  };

  const handleAction = (title: string) => {
    Alert.alert(title, `Navigation to ${title} is ready for implementation.`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4">
          <ProfileHeaderCard
            visitorName={MOCK_INMATE.name}
            visitorId={MOCK_INMATE.id}
            isVerified={MOCK_INMATE.verified}
            avatarInitials={MOCK_INMATE.avatarInitials}
            onEditPress={() => handleAction("Edit Profile")}
          />
          <View className="items-center mt-2">
            <Typography
              variant="caption"
              color="gray-500"
              className="font-bold uppercase tracking-widest"
            >
              {MOCK_INMATE.facility}
            </Typography>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row px-4 mt-6">
          <ProfileStatCard
            value={MOCK_INMATE.totalCalls}
            label="Calls"
            icon={<History size={18} color="#008400" />}
          />
          <ProfileStatCard
            value={`${MOCK_INMATE.minutesUsed}m`}
            label="Duration"
            icon={<Timer size={18} color="#008400" />}
          />
          <ProfileStatCard
            value={MOCK_INMATE.balance}
            label="Balance"
            icon={<Wallet size={18} color="#008400" />}
          />
        </View>

        {/* Account Settings */}
        <View className="px-2 mt-4">
          <ProfileMenuSection title="Prisoner Account">
            <ProfileMenuItem
              icon={<User size={20} color="#6B7280" />}
              label="Personal Information"
              onPress={() => handleAction("Personal Information")}
            />
            <ProfileMenuItem
              icon={<CreditCard size={20} color="#6B7280" />}
              label="Transaction History"
              onPress={() => router.push("/(tabs)/history")}
            />
            <ProfileMenuItem
              icon={<Wallet size={20} color="#6B7280" />}
              label="Recharge Account"
              onPress={() => router.push("/(tabs)/recharge")}
            />
            <ProfileMenuItem
              icon={<MessageSquare size={20} color="#6B7280" />}
              label="Request Call Credit"
              onPress={() => handleAction("Request Credit")}
            />
          </ProfileMenuSection>

          {/* Security & Access */}
          <ProfileMenuSection title="Security & Access">
            <ProfileMenuItem
              icon={<Fingerprint size={20} color="#6B7280" />}
              label="Biometric Verification"
              onPress={() => handleAction("Biometrics")}
            />
            <ProfileMenuItem
              icon={<Key size={20} color="#6B7280" />}
              label="Voice Pattern Update"
              onPress={() => handleAction("Voice Pattern")}
            />
            <ProfileMenuItem
              icon={<ShieldCheck size={20} color="#6B7280" />}
              label="Facility Regulations"
              onPress={() => handleAction("Regulations")}
            />
          </ProfileMenuSection>

          {/* Support */}
          <ProfileMenuSection title="Information & Support">
            <ProfileMenuItem
              icon={<HelpCircle size={20} color="#6B7280" />}
              label="How to use HMS"
              onPress={() => handleAction("Help")}
            />
            <ProfileMenuItem
              icon={<Info size={20} color="#6B7280" />}
              label="Legal Information"
              onPress={() => handleAction("Legal")}
            />
          </ProfileMenuSection>
        </View>

        {/* Logout Button */}
        <View className="px-4 mt-8 mb-10">
          <Button variant="danger" size="lg" onPress={handleLogout}>
            Exit Portal
          </Button>
          <Typography
            variant="caption"
            color="gray-500"
            className="text-center mt-4"
          >
            H.M.S. Inmate Portal v1.2.0 • Swaziland Correctional Services
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
