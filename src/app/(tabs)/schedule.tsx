import { ScheduleCallScreen } from "@/screens/ScheduleCallScreen";
import { useLocalSearchParams } from "expo-router";

export default function SchedulePage() {
  const { inmateName } = useLocalSearchParams<{ inmateName: string }>();

  return <ScheduleCallScreen initialInmateName={inmateName} />;
}
