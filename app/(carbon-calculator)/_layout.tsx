import { Stack } from "expo-router";

export default function CarbonCalculatorLayout() {
  return (
    <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Stack.Screen name="transportation" />
      {/* <Stack.Screen name="diet" options={{ headerShown: false }} />
      <Stack.Screen name="energy" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
