import { useGym } from "@/context/GymContext";
import React from "react";
import { Text, View } from "react-native";

const equipment = () => {
  const { selectedGymId } = useGym();
  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      <Text className="text-white text-3xl font-bold mt-8">
        Equipment Statuses
      </Text>
      <Text className="text-white/80 mt-4 font-semibold">
        Selected gym ID: {selectedGymId ?? "please select a gym to see results"}
      </Text>
    </View>
  );
};

export default equipment;
