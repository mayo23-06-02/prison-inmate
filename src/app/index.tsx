import { HMSCorrectionalLogo } from "@/components/ui/HMSCorrectionalLogo";
import { Typography } from "@/components/ui/Typography";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation for content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // After 7 seconds, go to login
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require("../assets/images/dashboard/bg41.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <HMSCorrectionalLogo size="xl" />
            </View>

            <View style={styles.textContainer}>
              <Typography
                variant="display-md"
                className="text-white text-center font-black uppercase tracking-widest"
                style={styles.title}
              >
                HMS CORRECTIONAL
              </Typography>
              <Typography
                variant="heading-md"
                className="text-white text-center font-bold mt-2 opacity-90"
                style={styles.subtitle}
              >
                Secure Communication Portal
              </Typography>
            </View>

            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Typography
                variant="body-sm"
                className="text-white mt-4 font-bold tracking-[2px] opacity-70"
              >
                LOADING SYSTEM...
              </Typography>
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)", // Darken background image for contrast
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  textContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  loaderContainer: {
    marginTop: 80,
    alignItems: "center",
  },
});
