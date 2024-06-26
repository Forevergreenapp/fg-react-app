import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, RadioButton, TextInput } from "react-native-paper";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { Slider } from "@react-native-assets/slider";

export default function TransportationCalculator() {
  const theme = useTheme();
  const [longFlights, setLongFlights] = useState(0);
  const [shortFlights, setShortFlights] = useState(0);
  const [carType, setCarType] = useState("Gas");
  const [milesPerWeek, setMilesPerWeek] = useState("");
  const [useTrain, setUseTrain] = useState("Yes");
  const [trainFrequency, setTrainFrequency] = useState("");
  const [useBus, setUseBus] = useState("Yes");
  const [busFrequency, setBusFrequency] = useState("");
  const [walkBike, setWalkBike] = useState("Yes");
  const [walkBikeFrequency, setWalkBikeFrequency] = useState("");
  const [flgihtEmissions, setFlightEmissions] = useState(0.0);
  const [carEmissions, setCarEmissions] = useState(0.0);
  const [publicTransportEmissions, setPublicTransportEmissions] = useState(0.0);
  const [totalEmissions, setTotalEmissions] = useState(0.0);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate form
    const validateForm = () => {
      const isTrainValid =
        useTrain === "No" || (useTrain === "Yes" && trainFrequency !== "");
      const isBusValid =
        useBus === "No" || (useBus === "Yes" && busFrequency !== "");
      const isWalkBikeValid =
        walkBike === "No" || (walkBike === "Yes" && walkBikeFrequency !== "");

      if (
        milesPerWeek !== "" &&
        isTrainValid &&
        isBusValid &&
        isWalkBikeValid
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    validateForm();
  }, [
    milesPerWeek,
    useTrain,
    trainFrequency,
    useBus,
    busFrequency,
    walkBike,
    walkBikeFrequency,
  ]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView>
          {/* Header */}
          <View className="px-12">
            <View className="flex-row items-center gap-6 mt-4">
              <Icon
                name="arrow-left"
                size={24}
                color="black"
                onPress={() => router.replace("/(tabs)/home")}
              />
              <View className="w-5/6">
                <Progress.Bar
                  progress={0.33}
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
            <Text className="text-4xl mt-6">Transportation</Text>

            {/* Long round-trip flights */}
            <Text className="mt-8 text-xl">
              In the last year, how many long round-trip flights have you been
              on? (more than 10 hours round trip) ✈️
            </Text>
            <View className="mt-4">
              <Slider
                minimumValue={0}
                maximumValue={7}
                step={1}
                value={longFlights}
                onValueChange={setLongFlights}
                minimumTrackTintColor="#8E8F8E"
                maximumTrackTintColor="#D9D9D9"
                thumbTintColor="#8E8F8E"
                trackHeight={9}
                thumbSize={20}
              />
            </View>
            <View className="flex-row items-center justify-between -mr-2.5">
              {["0", "1", "2", "3", "4", "5", "6", "7+"].map((item) => (
                <Text key={item} className="text-center">
                  {item}
                </Text>
              ))}
            </View>

            {/* Short round-trip flights */}
            <Text className="mt-8 text-xl">
              In the last year, how many short round-trip flights have you been
              on? (less than 10 hours round trip) ✈️
            </Text>
            <View className="mt-4">
              <Slider
                minimumValue={0}
                maximumValue={7}
                step={1}
                value={shortFlights}
                onValueChange={setShortFlights}
                minimumTrackTintColor="#8E8F8E"
                maximumTrackTintColor="#D9D9D9"
                thumbTintColor="#8E8F8E"
                trackHeight={9}
                thumbSize={20}
              />
            </View>
            <View className="flex-row items-center justify-between -mr-2.5">
              {["0", "1", "2", "3", "4", "5", "6", "7+"].map((item) => (
                <Text key={item} className="text-center">
                  {item}
                </Text>
              ))}
            </View>

            {/* Type of Car */}
            <Text className="mt-6 text-xl">What type of car do you drive?</Text>
            <View className="-ml-2">
              <View className="flex-row items-center mt-3">
                <RadioButton
                  value="Gas"
                  status={carType === "Gas" ? "checked" : "unchecked"}
                  onPress={() => setCarType("Gas")}
                  color="#44945F"
                />
                <Text className="text-lg">Gas</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton
                  value="Hybrid"
                  status={carType === "Hybrid" ? "checked" : "unchecked"}
                  onPress={() => setCarType("Hybrid")}
                  color="#44945F"
                />
                <Text className="text-lg">Hybrid</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton
                  value="Electric"
                  status={carType === "Electric" ? "checked" : "unchecked"}
                  onPress={() => setCarType("Electric")}
                  color="#44945F"
                />
                <Text className="text-lg">Electric</Text>
              </View>
            </View>

            {/* Miles per week */}
            <Text className="mt-6 text-xl">
              How many miles do you drive per week? 🚗
            </Text>
            <View className="mt-4 bg-white shadow-md shadow-black rounded-lg overflow-hidden">
              <TextInput
                placeholder="Your Answer"
                value={milesPerWeek}
                onChangeText={setMilesPerWeek}
                keyboardType="numeric"
                mode="outlined"
                outlineStyle={{ borderColor: "transparent" }}
                className="p-4"
                style={{
                  backgroundColor: "#FFF",
                }}
              />
            </View>

            {/* Train/metro */}
            <Text className="mt-8 text-xl">Do you use the train/metro?</Text>
            <View className="flex-row items-top justify-between mt-6">
              <View className="-ml-2 w-1/2">
                <View className="flex-row items-center">
                  <RadioButton
                    value="Yes"
                    status={useTrain === "Yes" ? "checked" : "unchecked"}
                    onPress={() => setUseTrain("Yes")}
                    color="#44945F"
                  />
                  <Text className="text-lg">Yes</Text>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="No"
                    status={useTrain === "No" ? "checked" : "unchecked"}
                    onPress={() => setUseTrain("No")}
                    color="#44945F"
                  />
                  <Text className="text-lg">No</Text>
                </View>
              </View>
              {useTrain === "Yes" && (
                <View className="w-1/2">
                  <Text className="text-sm">How many times a week?</Text>
                  <View className="mt-2 bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                    <TextInput
                      value={trainFrequency}
                      onChangeText={(trainFrequency) =>
                        setTrainFrequency(trainFrequency)
                      }
                      keyboardType="numeric"
                      mode="outlined"
                      outlineStyle={{ borderColor: "transparent" }}
                      style={{
                        height: 40,
                        padding: 0,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Bus */}
            <Text className="mt-8 text-xl">Do you use the bus?</Text>
            <View className="flex-row items-top justify-between mt-6">
              <View className="-ml-2 w-1/2">
                <View className="flex-row items-center">
                  <RadioButton
                    value="Yes"
                    status={useBus === "Yes" ? "checked" : "unchecked"}
                    onPress={() => setUseBus("Yes")}
                    color="#44945F"
                  />
                  <Text className="text-lg">Yes</Text>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="No"
                    status={useBus === "No" ? "checked" : "unchecked"}
                    onPress={() => setUseBus("No")}
                    color="#44945F"
                  />
                  <Text className="text-lg">No</Text>
                </View>
              </View>
              {useBus === "Yes" && (
                <View className="w-1/2">
                  <Text className="text-sm">How many times a week?</Text>
                  <View className="mt-2 bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                    <TextInput
                      value={busFrequency}
                      onChangeText={setBusFrequency}
                      keyboardType="numeric"
                      mode="outlined"
                      outlineStyle={{ borderColor: "transparent" }}
                      style={{
                        height: 40,
                        padding: 0,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Walk/bike */}
            <Text className="mt-8 text-xl">
              Do you walk/bike as a method of transportation?
            </Text>
            <View className="flex-row items-top justify-between mt-6">
              <View className="-ml-2 w-1/2">
                <View className="flex-row items-center">
                  <RadioButton
                    value="Yes"
                    status={walkBike === "Yes" ? "checked" : "unchecked"}
                    onPress={() => setWalkBike("Yes")}
                    color="#44945F"
                  />
                  <Text className="text-lg">Yes</Text>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="No"
                    status={walkBike === "No" ? "checked" : "unchecked"}
                    onPress={() => setWalkBike("No")}
                    color="#44945F"
                  />
                  <Text className="text-lg">No</Text>
                </View>
              </View>
              {walkBike === "Yes" && (
                <View className="w-1/2">
                  <Text className="text-sm">How many times a week?</Text>
                  <View className="mt-2 bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                    <TextInput
                      value={walkBikeFrequency}
                      onChangeText={setWalkBikeFrequency}
                      keyboardType="numeric"
                      mode="outlined"
                      outlineStyle={{ borderColor: "transparent" }}
                      style={{
                        height: 40,
                        padding: 0,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Total */}
            <View className="mt-8 mb-16 flex-col gap-6">
              <Text className="text-xl font-bold">
                Your Individual Transportation Emissions
              </Text>
              <Text className="text-lg">
                Flight Emissions: {flgihtEmissions.toFixed(1)}
              </Text>
              <Text className="text-lg">
                Car Emissions: {carEmissions.toFixed(1)}
              </Text>
              <Text className="text-lg">
                Public Transport: {publicTransportEmissions.toFixed(1)}
              </Text>
              <View className="font-bold flex-row justify-between mr-8">
                <Text className="font-bold text-lg">Total:</Text>
                <Text className="text-lg">{totalEmissions.toFixed(1)}</Text>
                <Text className="text-lg">tons of CO2 per year</Text>
              </View>
            </View>

            {/* Next Button */}
            <View
              className={`absolute py-3 px-4 rounded-full border-2 right-10 top-1/2 -translate-y-3 ${
                isFormValid
                  ? "border-black bg-[#AEDCA7]"
                  : "border-gray-300 bg-gray-300"
              }`}
            >
              <TouchableOpacity
                onPress={() => {
                  if (isFormValid) {
                    router.replace("/(carbon-calculator)/diet");
                  }
                }}
              >
                <Icon
                  name="arrow-right"
                  size={30}
                  color={isFormValid ? "#000" : "#AAA"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
