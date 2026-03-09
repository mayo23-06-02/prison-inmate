import { HMSCorrectionalLogo } from "@/components/ui/HMSCorrectionalLogo";
import { Input, PhoneInput } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Lock } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>(
    {},
  );
  const router = useRouter();

  const handleLogin = async () => {
    let newErrors: { phone?: string; password?: string } = {};
    if (!phoneNumber) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      // Link Dashboard and inmate app
      router.replace("/(tabs)" as any);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center py-6 pt-10">
            {/* Logo Section */}
            <View className="items-center my-8">
              <HMSCorrectionalLogo size="lg" />
              <Typography
                variant="body-md"
                className="mt-4 text-gray-500 text-center px-4"
              >
                Secure Communication Gateway for Correctional Facilities
              </Typography>
            </View>

            <Typography variant="heading-lg" className="mb-6">
              Officer Sign In
            </Typography>

            {/* Form */}
            <View>
              {/* Phone Input */}
              <PhoneInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                error={errors.phone}
                placeholder="7600 0000"
              />

              {/* Password Input */}
              <Input
                label="Password"
                secure
                placeholder="••••••••"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                error={errors.password}
                leftIcon={<Lock size={20} color="#008400" />}
                selectionColor="#008400"
              />

              {/* Forgot Password */}
              <TouchableOpacity className="self-end pt-1">
                <Typography
                  variant="body-sm"
                  className="text-primary-600 font-bold"
                >
                  Forgot Password?
                </Typography>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                className="bg-primary-500 h-16 rounded-2xl items-center justify-center mt-6 active:bg-primary-600 shadow-xl shadow-primary-200"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Typography
                    variant="button"
                    className="text-white font-bold text-xl uppercase tracking-widest"
                  >
                    Login
                  </Typography>
                )}
              </TouchableOpacity>
            </View>

            {/* Bottom Link */}
            <View className="flex-row justify-center mt-12 pt-10">
              <Typography variant="body-md" className="text-gray-500">
                Don't have an account?{" "}
              </Typography>
              <TouchableOpacity onPress={() => {}}>
                <Typography
                  variant="body-md"
                  className="text-primary-600 font-bold"
                >
                  Register Now
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
