import { Avatar } from "@/components/ui/Avatar";
import { Typography } from "@/components/ui/Typography";
import { useRouter } from "expo-router";
import { Phone, PhoneOff, Video } from "lucide-react-native";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

interface IncomingCallModalProps {
  visible: boolean;
  onClose: () => void;
  visitorName: string;
  avatar?: string;
}

export default function IncomingCallModal({
  visible,
  onClose,
  visitorName,
  avatar,
}: IncomingCallModalProps) {
  const router = useRouter();

  const handleAccept = () => {
    onClose();
    router.push("/call");
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-[40px] px-8 pt-12 pb-16 shadow-2xl relative border-t-4 border-primary-500 overflow-hidden">
          {/* Animated Glow Background */}
          <View className="absolute -top-10 -right-10 w-48 h-48 bg-primary-100 rounded-full blur-3xl opacity-30" />
          <View className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-30" />

          {/* Indicator */}
          <View className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />

          {/* Visitor Info */}
          <View className="items-center mb-10">
            <View className="relative">
              <Avatar
                size="xl"
                source={avatar ? { uri: avatar } : undefined}
                fallback={visitorName}
              />
              <View className="absolute -bottom-2 -right-2 bg-primary-500 p-2 rounded-full border-4 border-white">
                <Video size={16} color="white" />
              </View>
            </View>
            <Typography
              variant="heading-lg"
              className="text-gray-900 mt-6 font-bold uppercase tracking-tight"
            >
              {visitorName}
            </Typography>
            <Typography
              variant="body-md"
              className="text-primary-600 font-semibold tracking-widest mt-1"
            >
              INCOMING VIDEO CALL
            </Typography>
          </View>

          {/* Actions */}
          <View className="flex-row justify-between items-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <TouchableOpacity
              onPress={onClose}
              className="items-center justify-center p-6 bg-red-100 rounded-full shadow-lg shadow-red-200/50"
            >
              <PhoneOff size={32} color="#DC2626" />
              <Typography
                variant="caption"
                className="text-red-700 mt-2 font-bold uppercase tracking-tighter"
              >
                DECLINE
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAccept}
              className="items-center justify-center p-8 bg-primary-500 rounded-full shadow-xl shadow-primary-300"
            >
              <Phone size={40} color="white" />
              <Typography
                variant="caption"
                className="text-white mt-2 font-bold uppercase tracking-widest"
              >
                ACCEPT
              </Typography>
            </TouchableOpacity>
          </View>

          <View className="mt-8 items-center">
            <Typography variant="caption" className="text-gray-400 italic">
              Call is being monitored and recorded for security.
            </Typography>
          </View>
        </View>
      </View>
    </Modal>
  );
}
