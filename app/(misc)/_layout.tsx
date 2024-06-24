import { Stack } from "expo-router";

export default function MiscLayout() {
  return (
    <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Stack.Screen name="referral" options={{ title: "Refer a Friend" }} />
    </Stack>
  );
}
