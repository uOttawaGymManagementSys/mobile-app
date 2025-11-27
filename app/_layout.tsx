import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar className="flex-1 bg-white" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="equipment/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
