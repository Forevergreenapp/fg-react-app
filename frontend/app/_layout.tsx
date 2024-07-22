import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Import your global CSS file
import "../global.css";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIvTUeN-I9FnCgz7d0ybhdWRpwsyFH0_s",
  authDomain: "fg-react-app.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "fg-react-app",
  storageBucket: "fg-react-app.appspot.com",
  messagingSenderId: "489135632905",
  appId: "1:489135632905:web:20779662c09acf532a3ed8",
  measurementId: "G-TSS2FD4QBJ",
};

// Check if Firebase is already initialized
if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  getApp();
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
        <Stack
          screenOptions={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        >
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="index" />
        </Stack>
    </PaperProvider>
  );
}
