import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

// Import your global CSS file
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(64, 152, 88)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(157, 246, 177)",
    onPrimaryContainer: "rgb(0, 33, 12)",
    secondary: "rgb(80, 99, 82)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(211, 232, 211)",
    onSecondaryContainer: "rgb(14, 31, 18)",
    tertiary: "rgb(58, 101, 110)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(189, 234, 245)",
    onTertiaryContainer: "rgb(0, 31, 37)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 253, 247)",
    onBackground: "rgb(25, 28, 25)",
    surface: "rgb(252, 253, 247)",
    onSurface: "rgb(25, 28, 25)",
    surfaceVariant: "rgb(221, 229, 218)",
    onSurfaceVariant: "rgb(65, 73, 65)",
    outline: "rgb(113, 121, 112)",
    outlineVariant: "rgb(193, 201, 191)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 46)",
    inverseOnSurface: "rgb(240, 241, 236)",
    inversePrimary: "rgb(129, 217, 151)",
    elevation: {
      level0: "transparent",
      level1: "rgb(240, 246, 237)",
      level2: "rgb(232, 242, 232)",
      level3: "rgb(225, 237, 226)",
      level4: "rgb(223, 236, 224)",
      level5: "rgb(218, 233, 220)",
    },
    surfaceDisabled: "rgba(25, 28, 25, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 25, 0.38)",
    backdrop: "rgba(43, 50, 43, 0.4)",
  },
};

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
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(misc)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
