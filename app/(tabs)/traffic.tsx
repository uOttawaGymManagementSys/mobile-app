import { useGym } from "@/context/GymContext";
import React from "react";
import { Text, View } from "react-native";

export default function Traffic() {
  const { selectedGymId } = useGym();

  const gymName =
    selectedGymId === 4
      ? "Minto"
      : selectedGymId === 3
      ? "Montpetit"
      : "No Gym Selected";

  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      {/* Title */}
      <Text className="text-white text-3xl font-bold mt-8">Latest Traffic</Text>

      {/* Center Circle */}
      <View className="flex-1 justify-center items-center mt-[-150px]">
        <View className="w-60 h-60 rounded-full border-4 border-gray-50 justify-center items-center">
          <Text className="text-white text-7xl font-bold">42</Text>
          <Text className="text-white/80 text-xl font-semibold mt-2">
            {gymName}
          </Text>
        </View>
      </View>
    </View>
  );
}
