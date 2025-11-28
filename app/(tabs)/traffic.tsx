import { useGym } from "@/context/GymContext";
import { useTrafficData } from "@/hooks/useTrafficData";
import React from "react";
import { Text, View } from "react-native";

export default function Traffic() {
  const { selectedGymId } = useGym();
  const { traffic, loading, error } = useTrafficData(selectedGymId ?? null);

  const gymName =
    selectedGymId === 4
      ? "Minto"
      : selectedGymId === 3
      ? "Montpetit"
      : "No Gym Selected";

  const displayCount =
    traffic?.traffic_count != null ? String(traffic.traffic_count) : "--";

  function formatReadableDate(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const displayRecordedDate =
    traffic?.recorded_at != null
      ? formatReadableDate(traffic.recorded_at)
      : "--";

  const showTopMessage = () => {
    if (!selectedGymId) {
      return "Please select a gym on the Home tab.";
    }
    if (error) {
      return "Failed to load latest traffic. Please try again.";
    }
    if (loading && !traffic) {
      return "Loading latest traffic...";
    }
    if (traffic) {
      return `Last updated: ${displayRecordedDate}`;
    }
    return "";
  };

  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      {/* Title */}
      <Text className="text-white text-3xl font-bold mt-8">Latest Traffic</Text>

      {/* Status / helper text */}
      <Text className="text-white/80 mt-2 font-semibold">
        {showTopMessage()}
      </Text>

      {/* Center Circle */}
      <View className="flex-1 justify-center items-center mt-[-150px]">
        <View className="w-60 h-60 rounded-full border-4 border-gray-50 justify-center items-center">
          <Text className="text-white text-7xl font-bold">{displayCount}</Text>
          <Text className="text-white/80 text-xl font-semibold mt-2">
            {gymName}
          </Text>
        </View>
      </View>
    </View>
  );
}
