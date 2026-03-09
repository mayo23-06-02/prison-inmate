import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FileText,
  Flag,
  Mic,
  Phone,
  Video,
  Volume2,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Typography } from "../ui";

export const CallScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const inmateName = (params.inmateName as string) || "John Doe";
  const callType = (params.callType as "video" | "voice") || "video";

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(callType === "video");
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Call timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const endCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    // Navigate to rating screen after call ends
    router.replace({
      pathname: "/call/rating" as any,
      params: { inmateName },
    });
  };

  const submitReport = () => {
    // Mock submission
    console.log({ reason: reportReason, description: reportDescription });
    setReportModalVisible(false);
    setReportReason("");
    setReportDescription("");
    // Show success toast (simulated)
    alert("Report submitted. Thank you.");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Main content - video or voice */}
      <View className="flex-1 justify-center items-center">
        {callType === "video" && isVideoOn ? (
          <View className="w-full h-full bg-gray-900">
            {/* Remote video placeholder */}
            <View className="flex-1 justify-center items-center">
              <Typography
                variant="heading-lg"
                color="white"
                className="opacity-50"
              >
                {inmateName}
              </Typography>
              <Typography
                variant="body-sm"
                color="white"
                className="opacity-30 mt-2"
              >
                REMOTE VIDEO FEED
              </Typography>
            </View>
            {/* Local preview (PiP) */}
            <View className="absolute bottom-4 right-4 w-28 h-40 bg-gray-800 rounded-lg border-2 border-white/20 items-center justify-center">
              <Video size={24} color="rgba(255,255,255,0.2)" />
            </View>
          </View>
        ) : (
          <View className="items-center">
            {/* Voice call layout */}
            <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-6">
              <Typography
                variant="display-md"
                color="primary"
                className="text-3xl font-bold"
              >
                {inmateName.charAt(0)}
              </Typography>
            </View>
            <Typography variant="heading-lg" color="white" className="mb-2">
              {inmateName}
            </Typography>
            <Typography
              variant="display-md"
              color="white"
              className="font-mono text-2xl"
            >
              {formatTime(callDuration)}
            </Typography>
          </View>
        )}
      </View>

      {/* Call Controls Bar - FIXED AT BOTTOM */}
      <View className="bg-gray-900 pt-6 pb-12 px-6 rounded-t-[32px]">
        {/* Timer & recording indicator */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center bg-red-500/10 px-3 py-1 rounded-full">
            <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
            <Typography variant="caption" color="white" className="font-bold">
              REC
            </Typography>
          </View>
          <Typography
            variant="body-lg"
            color="white"
            className="font-mono font-bold"
          >
            {formatTime(callDuration)}
          </Typography>
          <View className="w-16" />
        </View>

        {/* Main controls row */}
        <View className="flex-row justify-around items-center mb-8">
          <TouchableOpacity
            className={`w-14 h-14 rounded-full items-center justify-center ${isMuted ? "bg-red-500" : "bg-gray-700"}`}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Mic size={24} color="white" />
          </TouchableOpacity>

          {callType === "video" && (
            <TouchableOpacity
              className={`w-14 h-14 rounded-full items-center justify-center ${!isVideoOn ? "bg-red-500" : "bg-gray-700"}`}
              onPress={() => setIsVideoOn(!isVideoOn)}
            >
              <Video size={24} color="white" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className={`w-14 h-14 rounded-full items-center justify-center ${isSpeakerOn ? "bg-primary-500" : "bg-gray-700"}`}
            onPress={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <Volume2 size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-16 h-16 rounded-full bg-red-600 items-center justify-center"
            onPress={endCall}
          >
            <Phone
              size={32}
              color="white"
              style={{ transform: [{ rotate: "135deg" }] }}
            />
          </TouchableOpacity>
        </View>

        {/* Secondary controls row - Rules & Report */}
        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity
            className="flex-row items-center bg-gray-800 px-5 py-2.5 rounded-full border border-gray-700"
            onPress={() => setRulesModalVisible(true)}
          >
            <FileText size={18} color="#9CA3AF" />
            <Typography
              variant="body-sm"
              color="gray-500"
              className="ml-2 font-medium"
            >
              Rules
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center bg-gray-800 px-5 py-2.5 rounded-full border border-gray-700"
            onPress={() => setReportModalVisible(true)}
          >
            <Flag size={18} color="#F97316" />
            <Typography
              variant="body-sm"
              color="gray-500"
              className="ml-2 font-medium"
            >
              Report
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* ========== RULES MODAL ========== */}
      <Modal visible={rulesModalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 pb-12">
            <View className="flex-row justify-between items-center mb-6">
              <Typography variant="heading-md" className="text-xl">
                Call Rules
              </Typography>
              <TouchableOpacity
                onPress={() => setRulesModalVisible(false)}
                className="p-2"
              >
                <Typography
                  variant="body-lg"
                  color="gray-500"
                  className="text-2xl"
                >
                  X
                </Typography>
              </TouchableOpacity>
            </View>
            <ScrollView
              className="max-h-80"
              showsVerticalScrollIndicator={false}
            >
              <View className="mb-6">
                <View className="bg-primary-50 self-start px-3 py-1 rounded-full mb-4">
                  <Typography
                    variant="caption"
                    color="primary"
                    className="font-bold"
                  >
                    MANDATORY COMPLIANCE
                  </Typography>
                </View>
                <View className="space-y-4">
                  <View className="flex-row items-start">
                    <Typography
                      variant="body-md"
                      color="gray-900"
                      className="font-bold mr-2"
                    >
                      1.
                    </Typography>
                    <Typography
                      variant="body-md"
                      color="gray-700"
                      className="flex-1"
                    >
                      No discussion of illegal activities or plans.
                    </Typography>
                  </View>
                  <View className="flex-row items-start mt-3">
                    <Typography
                      variant="body-md"
                      color="gray-900"
                      className="font-bold mr-2"
                    >
                      2.
                    </Typography>
                    <Typography
                      variant="body-md"
                      color="gray-700"
                      className="flex-1"
                    >
                      No inappropriate, offensive, or threatening language.
                    </Typography>
                  </View>
                  <View className="flex-row items-start mt-3">
                    <Typography
                      variant="body-md"
                      color="gray-900"
                      className="font-bold mr-2"
                    >
                      3.
                    </Typography>
                    <Typography
                      variant="body-md"
                      color="gray-700"
                      className="flex-1"
                    >
                      All calls are strictly monitored and recorded for security
                      purposes.
                    </Typography>
                  </View>
                </View>
              </View>
              <View className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <Typography variant="body-sm" className="text-orange-800">
                  Violations will result in immediate termination of the call
                  and may lead to loss of future visitation privileges.
                </Typography>
              </View>
            </ScrollView>
            <Button
              variant="primary"
              size="lg"
              onPress={() => setRulesModalVisible(false)}
              className="mt-8 rounded-xl"
            >
              I Understand
            </Button>
          </View>
        </View>
      </Modal>

      {/* ========== REPORT MODAL ========== */}
      <Modal visible={reportModalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 pb-12">
            <View className="flex-row justify-between items-center mb-6">
              <Typography variant="heading-md" className="text-xl">
                Report Issue
              </Typography>
              <TouchableOpacity
                onPress={() => setReportModalVisible(false)}
                className="p-2"
              >
                <Typography
                  variant="body-lg"
                  color="gray-500"
                  className="text-2xl"
                >
                  X
                </Typography>
              </TouchableOpacity>
            </View>

            <Typography variant="label" color="gray-700" className="mb-3">
              Reason for Report
            </Typography>

            <View className="flex-row flex-wrap mb-6">
              {[
                "Inappropriate language",
                "Threatening",
                "Technical issue",
                "Other",
              ].map((reason) => (
                <TouchableOpacity
                  key={reason}
                  className={`px-4 py-2.5 rounded-full mr-2 mb-2 border ${
                    reportReason === reason
                      ? "bg-primary-500 border-primary-500"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onPress={() => setReportReason(reason)}
                >
                  <Typography
                    variant="caption"
                    color={reportReason === reason ? "white" : "gray-700"}
                    className="font-bold"
                  >
                    {reason}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            <Typography variant="label" color="gray-700" className="mb-3">
              Additional Details (optional)
            </Typography>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 h-32"
              placeholder="Please provide more details about the issue..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={reportDescription}
              onChangeText={setReportDescription}
            />

            <View className="flex-row mt-8">
              <Button
                variant="secondary"
                size="lg"
                onPress={() => setReportModalVisible(false)}
                className="flex-1 mr-2 rounded-xl border-gray-200"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="lg"
                onPress={submitReport}
                disabled={!reportReason}
                className="flex-1 ml-2 rounded-xl"
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
