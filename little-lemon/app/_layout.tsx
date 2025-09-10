//layout entry point of app
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="profile" options={{ title: "profile", headerShown:false }} />
    <Stack.Screen name="app" options={{ title: "Home", headerShown: false }} />
  </Stack>;
}