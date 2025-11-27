import { useGym } from "@/context/GymContext";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { setSelectedGymId } = useGym();

  const handleSelectMinto = () => {
    setSelectedGymId(4); // Minto id = 4
    router.push("/traffic"); //redirect user to traffic screen
    console.log("minto selected successfully!");
  };

  const handleSelectMontpetit = () => {
    setSelectedGymId(3); // Montpetit id = 3
    router.push("/traffic"); //redirect user to traffic screen
    console.log("montpetit selected successfully!");
  };

  return (
    <View className="flex-1 bg-primary px-6 pt-12">
      <Text className="text-white text-3xl font-bold mt-8">Gym Insights</Text>
      <Text className="text-white/80 mt-4 font-semibold">Select a gym</Text>

      <View className="mt-20 gap-4">
        {/* Minto */}
        <Pressable
          className="rounded-2xl bg-white/15 px-5 py-4 ml-5 mr-5 active:bg-gray-100"
          onPress={handleSelectMinto}
        >
          {({ pressed }) => (
            <Text
              className={`text-lg font-semibold text-center ${
                pressed ? "text-black" : "text-white"
              }`}
            >
              Minto
            </Text>
          )}
        </Pressable>

        {/* Montpetit */}
        <Pressable
          className="rounded-2xl bg-white/15 px-5 py-4 ml-5 mr-5 active:bg-gray-100"
          onPress={handleSelectMontpetit}
        >
          {({ pressed }) => (
            <Text
              className={`text-lg font-semibold text-center ${
                pressed ? "text-black" : "text-white"
              }`}
            >
              Montpetit
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
