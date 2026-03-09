import { Stack } from "expo-router";
import React from "react";

export default function CallLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="active" />
      <Stack.Screen name="rating" />
    </Stack>
  );
}
