import { useLocalSearchParams, useRouter } from "expo-router";
import { Clock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Checkbox, Typography } from "../ui";

const INSPECTION_TIME = 45; // seconds

export const PreCallInspectionScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const inmateName = (params.inmateName as string) || "John Doe";

  const [timeLeft, setTimeLeft] = useState(INSPECTION_TIME);
  const [checks, setChecks] = useState([false, false, false]);
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimerComplete(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const allChecked = checks.every(Boolean);
  const canProceed = allChecked && isTimerComplete;

  const handleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex-row items-center mb-6">
          <Typography variant="heading-lg" color="gray-900">
            Officer Inspection
          </Typography>
        </View>

        <Card
          variant="outline"
          padding="lg"
          className="mb-6 items-center border-gray-200"
        >
          <Clock size={32} color="#008400" />
          <Typography
            variant="display-md"
            color="primary"
            className="mt-2 text-3xl font-bold"
          >
            {formatTime(timeLeft)}
          </Typography>
          <Typography variant="body-sm" color="gray-500" className="mt-1">
            Time remaining before you can proceed
          </Typography>
        </Card>

        <Card
          variant="default"
          padding="lg"
          className="mb-6 border border-gray-100"
        >
          <Typography variant="heading-md" className="mb-4">
            You must acknowledge the following:
          </Typography>
          {[
            "I will not discuss any illegal activities or plans.",
            "I will not use inappropriate or threatening language.",
            "I understand that this call is monitored and recorded.",
          ].map((text, index) => (
            <Checkbox
              key={index}
              checked={checks[index]}
              onPress={() => handleCheck(index)}
              label={text}
            />
          ))}
          {!allChecked && (
            <Typography variant="caption" className="text-orange-500 mt-2">
              Please acknowledge all rules.
            </Typography>
          )}
        </Card>

        <Button
          variant="primary"
          size="lg"
          onPress={() =>
            router.replace({ pathname: "/call/active", params: { inmateName } })
          }
          disabled={!canProceed}
          className="mt-2 rounded-lg"
        >
          Proceed to Call
        </Button>

        <Typography
          variant="caption"
          color="gray-500"
          className="text-center mt-6"
        >
          This inspection ensures compliance with correctional facility
          regulations.
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
};
