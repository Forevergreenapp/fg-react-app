import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, RadioButton } from "react-native-paper";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

export default function DietCalculator() {
  const theme = useTheme();
  const [diet, setDiet] = useState("");
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [progress, setProgress] = useState(0.33);

  const dietOptions = [
    "Meat Lover",
    "Average",
    "No Beef Or Lamb",
    "Veterinarian",
    "Vegan",
  ];

  useEffect(() => {
    setIsFormValid(diet !== "");

    switch (diet) {
      case "Meat Lover":
        setDietEmissions(3.5);
        break;
      case "Average":
        setDietEmissions(2.5);
        break;
      case "No Beef Or Lamb":
        setDietEmissions(1.9);
        break;
      case "Veterinarian":
        setDietEmissions(1.7);
        break;
      case "Vegan":
        setDietEmissions(1.5);
        break;
      default:
        setDietEmissions(0.0);
    }

    if (diet !== "") {
      setProgress(0.66);
    } else {
      setProgress(0.33);
    }
  }, [diet]);

  const handleDietSelection = (selectedDiet: string) => {
    setDiet(selectedDiet);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView>
        <View className="px-12">
          {/* Header */}
          <View className="flex-row items-center gap-6 mt-4">
            <Icon
              name="arrow-left"
              size={24}
              color="black"
              onPress={() => router.replace("transportation")}
            />
            <View className="w-5/6">
              <Progress.Bar
                progress={progress}
                width={null}
                color="#AEDCA7"
                unfilledColor="#FFF"
                borderColor={theme.colors.onBackground}
                borderWidth={1.5}
                height={15}
                borderRadius={9999}
              />
            </View>
          </View>
          <Text className="text-4xl mt-6">Diet</Text>

          {/* Diet Selection */}
          <Text className="mt-8 text-xl">Select your Diet</Text>
          <View className="-ml-2 mt-3">
            {dietOptions.map((option) => (
              <View key={option} className="flex-row items-center">
                <RadioButton
                  value={option}
                  status={diet === option ? "checked" : "unchecked"}
                  onPress={() => handleDietSelection(option)}
                  color="#44945F"
                />
                <Text className="text-lg">{option}</Text>
              </View>
            ))}
          </View>

          {/* Emissions Display */}
          <View className="mt-8 mb-16">
            <Text className="text-xl font-bold ">
              Your Estimated Individual Diet Emissions
            </Text>
            <View className="flex-row justify-between mt-4">
              <Text className="text-lg font-bold">Diet Emissions</Text>
              <Text className="text-lg">{dietEmissions.toFixed(1)}</Text>
              <Text className="text-lg">tons of CO2 per year</Text>
            </View>
          </View>
        </View>

        {/* Next Button */}
        <View className="flex items-end mb-10 mr-10">
          <TouchableOpacity
            onPress={() => {
              if (isFormValid) {
                router.replace("energy");
              }
            }}
          >
            <View
              className={`py-3 px-4 rounded-full border-2 h-16 w-16 ${
                isFormValid
                  ? "border-black bg-[#AEDCA7]"
                  : "border-gray-300 bg-gray-300"
              }`}
            >
              <Icon
                name="arrow-right"
                size={30}
                color={isFormValid ? "#000" : "#AAA"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
