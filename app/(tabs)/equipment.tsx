import { useGym } from "@/context/GymContext";
import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";

type EquipmentItem = {
  id: string;
  name: string;
  number: number; // physical sticker number
  status: boolean; // true = working, false = maintenance
};

export default function Equipment() {
  const { selectedGymId } = useGym();

  const gymName =
    selectedGymId === 4
      ? "Minto"
      : selectedGymId === 3
      ? "Montpetit"
      : "No Gym Selected";

  // Dummy data for each gym
  const data: EquipmentItem[] = useMemo(() => {
    if (selectedGymId === 4) {
      // Minto (bigger gym)
      return [
        // 8 Treadmills
        { id: "1", name: "Treadmill", number: 10, status: true },
        { id: "2", name: "Treadmill", number: 20, status: true },
        { id: "3", name: "Treadmill", number: 30, status: false },
        { id: "4", name: "Treadmill", number: 40, status: true },
        { id: "5", name: "Treadmill", number: 50, status: true },
        { id: "6", name: "Treadmill", number: 60, status: true },
        { id: "7", name: "Treadmill", number: 70, status: true },
        { id: "8", name: "Treadmill", number: 80, status: true },

        // 4 Stairmasters
        { id: "9", name: "StairMaster", number: 1, status: true },
        { id: "10", name: "StairMaster", number: 2, status: true },
        { id: "11", name: "StairMaster", number: 3, status: false },
        { id: "12", name: "StairMaster", number: 4, status: true },

        // Benches
        { id: "13", name: "Flat Bench", number: 1, status: true },
        { id: "14", name: "Flat Bench", number: 2, status: true },
        { id: "15", name: "Incline Bench", number: 3, status: true },
        { id: "16", name: "Incline Bench", number: 4, status: false },

        // Leg machines
        { id: "17", name: "Leg Press", number: 41, status: true },
        { id: "18", name: "Calf Raise", number: 42, status: true },
      ];
    }

    if (selectedGymId === 3) {
      // Montpetit (smaller gym)
      return [
        // 4 Treadmills
        { id: "1", name: "Treadmill", number: 1, status: true },
        { id: "2", name: "Treadmill", number: 2, status: true },
        { id: "3", name: "Treadmill", number: 3, status: false },
        { id: "4", name: "Treadmill", number: 4, status: true },

        // 4 Stairmasters
        { id: "5", name: "StairMaster", number: 1, status: true },
        { id: "6", name: "StairMaster", number: 2, status: true },
        { id: "7", name: "StairMaster", number: 3, status: true },
        { id: "8", name: "StairMaster", number: 4, status: true },

        // Benches
        { id: "9", name: "Flat Bench", number: 31, status: true },
        { id: "10", name: "Flat Bench", number: 32, status: false },
        { id: "11", name: "Incline Bench", number: 33, status: true },

        // Leg machines
        { id: "12", name: "Leg Press", number: 41, status: true },
        { id: "13", name: "Calf Raise", number: 42, status: true },
      ];
    }

    // No gym selected
    return [];
  }, [selectedGymId]);

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

  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      <Text className="text-white text-3xl font-bold mt-8">
        Equipment Statuses
      </Text>
      <Text className="text-white/80 mt-2 font-semibold">{gymName}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 24 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <View className="rounded-2xl bg-white px-4 py-3 mx-1 flex-row items-center justify-between">
            <View>
              <Text className="text-black text-base font-semibold">
                {item.name}
              </Text>
              <Text className="text-black text-sm">Machine #{item.number}</Text>
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
    </View>
  );
}
