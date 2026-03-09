import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, Star } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Typography } from "../ui";

const ISSUES = [
  "Connection dropped",
  "Poor audio quality",
  "Blurred video",
  "Inmate couldn't hear me",
  "App crashed",
  "Other",
];

export const CallRatingScreen = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const inmateName = (params.inmateName as string) || "John Doe";

  const [rating, setRating] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleIssue = (issue: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue],
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white p-8">
        <Skeleton
          variant="circle"
          width={80}
          height={80}
          className="self-center mb-8"
        />
        <Skeleton variant="rect" width="100%" height={24} className="mb-4" />
        <Skeleton
          variant="rect"
          width="60%"
          height={16}
          className="self-center mb-10"
        />
        <View className="flex-row justify-center space-x-2 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              variant="rect"
              width={40}
              height={40}
              className="rounded-lg"
            />
          ))}
        </View>
        <Skeleton
          variant="rect"
          width="100%"
          height={120}
          className="rounded-lg"
        />
      </View>
    );
  }

  if (submitted) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-8">
        <View className="w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-6">
          <CheckCircle size={48} color="#008400" />
        </View>
        <Typography
          variant="heading-lg"
          color="gray-900"
          className="text-center uppercase text-xl"
        >
          Thank You!
        </Typography>
        <Typography
          variant="body-md"
          color="gray-500"
          className="text-center mt-2 font-medium"
        >
          Your feedback helps us improve the visitation experience.
        </Typography>
        <Button
          variant="primary"
          size="lg"
          onPress={() => router.replace("/(tabs)")}
          className="mt-10 w-full rounded-lg"
        >
          BACK TO DASHBOARD
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
    >
      <View className="items-center mt-6 mb-8">
        <View className="w-16 h-16 bg-primary-50 rounded-2xl items-center justify-center mb-6 border border-primary-100">
          <Star size={32} color="#008400" fill="#008400" />
        </View>
        <Typography
          variant="heading-lg"
          color="gray-900"
          className="text-center uppercase tracking-tight"
        >
          Rate Your Call
        </Typography>
        <Typography
          variant="body-md"
          color="gray-500"
          className="text-center mt-1 font-medium"
        >
          How was your session with {inmateName}?
        </Typography>
      </View>

      {/* Stars */}
      <View className="flex-row justify-center space-x-3 mb-10">
        {[1, 2, 3, 4, 5].map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setRating(s)}
            className={cn(
              "p-3 rounded-lg border",
              rating >= s
                ? "bg-primary-50 border-primary-200"
                : "bg-gray-50 border-gray-100",
            )}
          >
            {rating >= s ? (
              <Star size={32} color="#008400" fill="#008400" />
            ) : (
              <Star size={32} color="#D1D5DB" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Issues */}
      <View className="mb-8">
        <Typography
          variant="label"
          color="gray-500"
          className="uppercase tracking-widest mb-4 ml-1"
        >
          Report Issues (Optional)
        </Typography>
        <View className="flex-row flex-wrap">
          {ISSUES.map((issue) => (
            <TouchableOpacity
              key={issue}
              onPress={() => toggleIssue(issue)}
              className={cn(
                "mr-3 mb-3 px-4 py-2.5 rounded-full border",
                selectedIssues.includes(issue)
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-100",
              )}
            >
              <Typography
                variant="caption"
                className={cn(
                  "font-bold uppercase",
                  selectedIssues.includes(issue)
                    ? "text-red-700"
                    : "text-gray-500",
                )}
              >
                {issue}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Feedback input */}
      <View className="mb-8">
        <Typography
          variant="label"
          color="gray-500"
          className="uppercase tracking-widest mb-4 ml-1"
        >
          Additional Feedback
        </Typography>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Anything else you'd like to share?"
          placeholderTextColor="#9CA3AF"
          value={feedback}
          onChangeText={setFeedback}
          className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-gray-900 font-medium h-32"
          textAlignVertical="top"
        />
      </View>

      {/* Submit */}
      <Button
        variant="primary"
        size="lg"
        onPress={() => setSubmitted(true)}
        disabled={rating === 0}
        className="rounded-lg h-14"
      >
        SUBMIT FEEDBACK
      </Button>
    </ScrollView>
  );
};
