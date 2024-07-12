import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  RadioButtonGroup,
  NextButton,
} from "../../components/carbon-calculator";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function DietCalculator() {
  const [diet, setDiet] = useState("Average");
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [transportationEmissions, setTransportationEmissions] = useState(0.0);
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

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTransportationData();
      if (data) {
        setTransportationEmissions(data.transportationEmissions);
      }
    };

    loadData();
  }, []);

  const fetchTransportationData = async () => {
    const auth = getAuth();
    const db = getFirestore();

    if (!auth.currentUser) {
      console.error("No user logged in");
      return null;
    }

    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.transportationData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching transportation data:", error);
      return null;
    }
  };

  if (!transportationEmissions) {
    return <Text>Loading...</Text>;
  }

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
            <View className="flex-row mt-4">
              <Text className="text-lg mr-4">Transportation Emissions</Text>
              <Text className="text-lg">
                {transportationEmissions.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row mt-4">
              <Text className="text-lg mr-4">Diet Emissions</Text>
              <Text className="text-lg">{dietEmissions.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mt-4">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg">
                {(transportationEmissions + dietEmissions).toFixed(2)}
              </Text>
              <Text className="text-lg">tons of CO2 per year</Text>
            </View>
          </View>
        </View>

        {/* Next Button */}
        <NextButton
          isFormValid={isFormValid}
          onNext="energy"
          data={{
            diet,
            dietEmissions,
          }}
          type="diet"
        />
      </SafeAreaView>
    </ScrollView>
  );
}
