import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useTheme,
  RadioButton,
  TextInput,
  HelperText,
} from "react-native-paper";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { Slider } from "@react-native-assets/slider";

export default function TransportationCalculator() {
  const theme = useTheme();

  const [longFlights, setLongFlights] = useState(0);
  const [shortFlights, setShortFlights] = useState(0);
  const [carType, setCarType] = useState("");
  const [milesPerWeek, setMilesPerWeek] = useState("");
  const [milesError, setMilesError] = useState("");
  const [useTrain, setUseTrain] = useState("");
  const [trainFrequency, setTrainFrequency] = useState("");
  const [trainFrequencyError, setTrainFrequencyError] = useState("");
  const [useBus, setUseBus] = useState("");
  const [busFrequency, setBusFrequency] = useState("");
  const [busFrequencyError, setBusFrequencyError] = useState("");
  const [walkBike, setWalkBike] = useState("");
  const [walkBikeFrequency, setWalkBikeFrequency] = useState("");
  const [walkBikeFrequencyError, setWalkBikeFrequencyError] = useState("");
  const [flgihtEmissions, setFlightEmissions] = useState(0.0);
  const [carEmissions, setCarEmissions] = useState(0.0);
  const [publicTransportEmissions, setPublicTransportEmissions] = useState(0.0);
  const [totalEmissions, setTotalEmissions] = useState(0.0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState({
    longFlights: false,
    shortFlights: false,
    carType: false,
    milesPerWeek: false,
    useTrain: false,
    useBus: false,
    walkBike: false,
  });

  const updateProgress = () => {
    const totalQuestions = Object.keys(completedQuestions).length;
    const completedCount =
      Object.values(completedQuestions).filter(Boolean).length;
    setProgress((completedCount / totalQuestions) * 0.33);
  };

  useEffect(() => {
    updateProgress();
  }, [completedQuestions]);

  const markQuestionCompleted = (question: string) => {
    setCompletedQuestions((prev) => ({ ...prev, [question]: true }));
  };

  // Modify the existing state setters to mark questions as completed
  const setLongFlightsWithCompletion = (
    value: React.SetStateAction<number>
  ) => {
    setLongFlights(value);
    markQuestionCompleted("longFlights");
  };

  const setShortFlightsWithCompletion = (
    value: React.SetStateAction<number>
  ) => {
    setShortFlights(value);
    markQuestionCompleted("shortFlights");
  };

  const setCarTypeWithCompletion = (value: React.SetStateAction<string>) => {
    setCarType(value);
    markQuestionCompleted("carType");
  };

  const setMilesPerWeekWithCompletion = (
    value: React.SetStateAction<string>
  ) => {
    setMilesPerWeek(value);
    if (value !== "") {
      markQuestionCompleted("milesPerWeek");
    }
  };

  const setUseTrainWithCompletion = (value: React.SetStateAction<string>) => {
    setUseTrain(value);
    markQuestionCompleted("useTrain");
  };

  const setUseBusWithCompletion = (value: React.SetStateAction<string>) => {
    setUseBus(value);
    markQuestionCompleted("useBus");
  };

  const setWalkBikeWithCompletion = (value: React.SetStateAction<string>) => {
    setWalkBike(value);
    markQuestionCompleted("walkBike");
  };

  const validateNumber = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value === "") {
      setter("");
      errorSetter("");
    } else if (isNaN(Number(value)) || parseFloat(value) < 0) {
      errorSetter("Please enter a valid amount");
    } else {
      const decimalPlaces = value.split(".")[1];
      if (decimalPlaces && decimalPlaces.length > 2) {
        setter(value.slice(0, -1));
      } else {
        setter(value);
        errorSetter("");
      }
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const isTrainValid =
        useTrain === "No" ||
        (useTrain === "Yes" && trainFrequency !== "" && !trainFrequencyError);
      const isBusValid =
        useBus === "No" ||
        (useBus === "Yes" && busFrequency !== "" && !busFrequencyError);
      const isWalkBikeValid =
        walkBike === "No" ||
        (walkBike === "Yes" &&
          walkBikeFrequency !== "" &&
          !walkBikeFrequencyError);

      if (
        milesPerWeek !== "" &&
        !milesError &&
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
    milesError,
    useTrain,
    trainFrequency,
    trainFrequencyError,
    useBus,
    busFrequency,
    busFrequencyError,
    walkBike,
    walkBikeFrequency,
    walkBikeFrequencyError,
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
                onPress={() => router.replace("/(auth)/getstarted")}
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
                onValueChange={setLongFlightsWithCompletion}
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
                onValueChange={setShortFlightsWithCompletion}
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
                  onPress={() => setCarTypeWithCompletion("Gas")}
                  color="#44945F"
                />
                <Text className="text-lg">Gas</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton
                  value="Hybrid"
                  status={carType === "Hybrid" ? "checked" : "unchecked"}
                  onPress={() => setCarTypeWithCompletion("Hybrid")}
                  color="#44945F"
                />
                <Text className="text-lg">Hybrid</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton
                  value="Electric"
                  status={carType === "Electric" ? "checked" : "unchecked"}
                  onPress={() => setCarTypeWithCompletion("Electric")}
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
                onChangeText={(value) =>
                  validateNumber(
                    value,
                    setMilesPerWeekWithCompletion,
                    setMilesError
                  )
                }
                keyboardType="numeric"
                mode="outlined"
                outlineStyle={{ borderColor: "transparent" }}
                className="p-4"
                style={{
                  backgroundColor: "#FFF",
                }}
              />
            </View>
            <HelperText type="error" visible={!!milesError}>
              {milesError}
            </HelperText>

            {/* Train/metro */}
            <Text className="mt-8 text-xl">Do you use the train/metro?</Text>
            <View className="flex-row items-top justify-between mt-6">
              <View className="-ml-2 w-1/2">
                <View className="flex-row items-center">
                  <RadioButton
                    value="Yes"
                    status={useTrain === "Yes" ? "checked" : "unchecked"}
                    onPress={() => setUseTrainWithCompletion("Yes")}
                    color="#44945F"
                  />
                  <Text className="text-lg">Yes</Text>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="No"
                    status={useTrain === "No" ? "checked" : "unchecked"}
                    onPress={() => setUseTrainWithCompletion("No")}
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
                      onChangeText={(value) =>
                        validateNumber(
                          value,
                          setTrainFrequency,
                          setTrainFrequencyError
                        )
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
                  <HelperText type="error" visible={!!trainFrequencyError}>
                    {trainFrequencyError}
                  </HelperText>
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
                    onPress={() => setUseBusWithCompletion("Yes")}
                    color="#44945F"
                  />
                  <Text className="text-lg">Yes</Text>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="No"
                    status={useBus === "No" ? "checked" : "unchecked"}
                    onPress={() => setUseBusWithCompletion("No")}
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
                      onChangeText={(value) =>
                        validateNumber(
                          value,
                          setBusFrequency,
                          setBusFrequencyError
                        )
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
                  <HelperText type="error" visible={!!busFrequencyError}>
                    {busFrequencyError}
                  </HelperText>
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
                    onPress={() => setWalkBikeWithCompletion("Yes")}
                    color="#44945F"
                  />
                  <Text className="text-lg">Yes</Text>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="No"
                    status={walkBike === "No" ? "checked" : "unchecked"}
                    onPress={() => setWalkBikeWithCompletion("No")}
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
                      onChangeText={(value) =>
                        validateNumber(
                          value,
                          setWalkBikeFrequency,
                          setWalkBikeFrequencyError
                        )
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
                  <HelperText type="error" visible={!!walkBikeFrequencyError}>
                    {walkBikeFrequencyError}
                  </HelperText>
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
          </View>

          {/* Next Button */}
          <View className="flex items-end mb-10 mr-10">
            <TouchableOpacity
              onPress={() => {
                if (isFormValid) {
                  router.replace("diet");
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
    </KeyboardAvoidingView>
  );
}
