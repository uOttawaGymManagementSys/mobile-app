import { useGym } from "@/context/GymContext";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Equipment() {
  const { selectedGymId } = useGym();
  const { equipment, loading, error } = useEquipmentData(selectedGymId ?? null);

  const gymName =
    selectedGymId === 4
      ? "Minto"
      : selectedGymId === 3
      ? "Montpetit"
      : "No Gym Selected";

  if (!selectedGymId) {
    return (
      <View className="flex-1 bg-primary px-6 pt-12">
        <Text className="text-white text-3xl font-bold mt-8">
          Equipment Statuses
        </Text>
        <Text className="text-white/80 mt-4 font-semibold">
          Please select a gym on the Home tab to see equipment.
        </Text>
      </View>
    );
  }

  const data = equipment ?? [];

  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      <Text className="text-white text-3xl font-bold mt-8">
        Equipment Statuses
      </Text>
      <Text className="text-white/80 mt-2 font-semibold">{gymName}</Text>

      {error && (
        <Text className="text-red-300 mt-2 font-semibold">
          Failed to load equipment. Please try again later.
        </Text>
      )}

      {loading && !equipment ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 24 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => (
            <View className="rounded-2xl bg-white px-4 py-3 mx-1 flex-row items-center justify-between">
              <View>
                <Text className="text-black text-base font-semibold">
                  {item.name}
                </Text>
                <Text className="text-black text-sm">
                  Machine #{item.number}
                </Text>
              </View>

              {/* Status badge */}
              <View
                className={`px-3 py-1 rounded-full ${
                  item.status ? "bg-green-500/30" : "bg-red-500/30"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    item.status ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {item.status ? "Available" : "Maintenance"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
