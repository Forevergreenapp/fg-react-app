import { Stack } from "expo-router";

export default function MiscLayout() {
  return (
    <Stack>
      <Stack.Screen name="referral" options={{ title: 'Refer a Friend', headerShown: false }} />
    </Stack>
  );
}