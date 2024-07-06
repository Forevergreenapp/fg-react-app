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
      <Stack.Screen name="diet" />
      <Stack.Screen name="energy" />
      <Stack.Screen name="breakdown" /> 
    </Stack>
  );
}
