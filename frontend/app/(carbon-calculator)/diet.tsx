import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  RadioButtonGroup,
  NextButton,
} from "../../components/carbon-calculator";

export default function DietCalculator() {
  const [diet, setDiet] = useState("Average");
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [progress, setProgress] = useState(0.33);

  useEffect(() => {
    setIsFormValid(diet !== "");

    switch (diet) {
      case "Meat Lover":
        setDietEmissions(3.3);
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView>
        <View className="px-12">
          {/* Header */}
          <Header onBack="transportation" progress={progress} title="Diet" />

          {/* Diet Selection */}
          <RadioButtonGroup
            question="Select your Diet"
            options={[
              "Meat Lover",
              "Average",
              "No Beef Or Lamb",
              "Veterinarian",
              "Vegan",
            ]}
            value={diet}
            onChange={(selectedDiet: string) => {
              setDiet(selectedDiet);
            }}
          />

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
        <NextButton isFormValid={isFormValid} onNext={"energy"} />
      </SafeAreaView>
    </ScrollView>
  );
}
