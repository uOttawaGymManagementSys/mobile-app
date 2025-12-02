import icon from "@/assets/images/icon.png";
import { useGym } from "@/context/GymContext";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

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
      <Text className="text-white text-3xl font-bold mt-8">
        Fitness Centres Insights
      </Text>
      <Text className="text-white/80 mt-4 font-semibold">
        Select a fitness centre
      </Text>

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
        {/* Company Icon */}
        <View className="mt-[+105] w-full flex items-center justify-center">
          <Image
            source={icon}
            className="w-[150] h-[150] opacity-100"
            resizeMode="contain"
          />
          <Text className="text-white/60 text-sm mt-3">
            University of Ottawa
          </Text>
        </View>
      </View>
    </View>
  );
}
