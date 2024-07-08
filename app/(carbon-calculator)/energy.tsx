import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useTheme,
  RadioButton,
  TextInput,
  Menu,
  Searchbar,
  HelperText,
} from "react-native-paper";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { Slider } from "@react-native-assets/slider";
import statesData from "../../constants/states.json";

export default function EnergyCalculator() {
  const theme = useTheme();
  const [state, setState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [electricBill, setElectricBill] = useState("");
  const [electricBillError, setElectricBillError] = useState("");
  const [waterBill, setWaterBill] = useState("");
  const [waterBillError, setWaterBillError] = useState("");
  const [propaneBill, setPropaneBill] = useState("");
  const [propaneBillError, setPropaneBillError] = useState("");
  const [gasBill, setGasBill] = useState("");
  const [gasBillError, setGasBillError] = useState("");
  const [useWoodStove, setUseWoodStove] = useState("");
  const [peopleInHome, setPeopleInHome] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [electricEmissions, setElectricEmissions] = useState(0.0);
  const [waterEmissions, setWaterEmissions] = useState(0.0);
  const [otherEnergyEmissions, setOtherEnergyEmissions] = useState(0.0);
  const [transportationDietEmissions, setTransportationDietEmissions] =
    useState(0.0);
  const [totalEmissions, setTotalEmissions] = useState(0.0);
  const [progress, setProgress] = useState(0.66);

  const updateProgress = useCallback(() => {
    let completedQuestions = 0;
    const totalQuestions = 7; // Total number of questions

    if (state) completedQuestions++;
    if (electricBill) completedQuestions++;
    if (waterBill) completedQuestions++;
    if (propaneBill) completedQuestions++;
    if (gasBill) completedQuestions++;
    if (useWoodStove) completedQuestions++;
    if (peopleInHome !== 1) completedQuestions++; // Assuming 1 is the default value

    const newProgress = 0.83 + (completedQuestions / totalQuestions) * 0.17;
    setProgress(newProgress);
  }, [
    state,
    electricBill,
    waterBill,
    propaneBill,
    gasBill,
    useWoodStove,
    peopleInHome,
  ]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  const filteredStates = statesData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof statesData)[number] }) => (
      <Menu.Item
        onPress={() => {
          setState(item.name);
          setMenuVisible(false);
        }}
        title={`${item.name} (${item.abbreviation})`}
      />
    ),
    []
  );

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
    // Add form validation logic here
    const isElectricBillValid = electricBill !== "" && electricBillError === "";
    const isWaterBillValid = waterBill !== "" && waterBillError === "";
    const isPropaneBillValid = propaneBill !== "" && propaneBillError === "";
    const isGasBillValid = gasBill !== "" && gasBillError === "";
    const isFormValid =
      isElectricBillValid &&
      isWaterBillValid &&
      isPropaneBillValid &&
      isGasBillValid;
    setIsFormValid(isFormValid);
    updateProgress(); // Update progress when form validity changes
  }, [
    state,
    electricBill,
    electricBillError,
    waterBill,
    waterBillError,
    propaneBill,
    propaneBillError,
    gasBill,
    gasBillError,
    useWoodStove,
    peopleInHome,
    updateProgress,
  ]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView>
        {/* Header */}
        <View className="flex-row items-center gap-6 mt-4 mx-8">
          <Icon
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => router.replace("diet")}
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
        <View className="px-12">
          {/* Title */}
          <Text className="text-4xl mt-6">Energy</Text>

          {/* State Selection */}
          <Text className="mt-6 text-lg">Which State do you live in?</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <View className="mt-2 bg-white border border-gray-300 rounded-lg p-3">
                  <Text>{state || "Select a state"}</Text>
                </View>
              </TouchableOpacity>
            }
          >
            <Searchbar
              placeholder="Search states"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
            <FlatList
              data={filteredStates}
              renderItem={renderItem}
              keyExtractor={(item) => item.abbreviation}
              style={{ maxHeight: 300 }}
            />
          </Menu>

          {/* Electric Bill */}
          <Text className="mt-6 text-xl">
            How much was your electric bill last month?
          </Text>
          <View className="mt-4 bg-white shadow-md shadow-black rounded-lg overflow-hidden">
            <TextInput
              placeholder="Your Answer"
              value={electricBill}
              onChangeText={(value) => {
                validateNumber(value, setElectricBill, setElectricBillError);
              }}
              keyboardType="numeric"
              mode="outlined"
              outlineStyle={{ borderColor: "transparent" }}
              className="p-4"
              style={{
                backgroundColor: "#FFF",
              }}
            />
          </View>
          <HelperText type="error" visible={electricBillError !== ""}>
            {electricBillError}
          </HelperText>

          {/* Water Bill */}
          <Text className="mt-6 text-xl">
            How much was your water bill last month?
          </Text>
          <View className="mt-4 bg-white shadow-md shadow-black rounded-lg overflow-hidden">
            <TextInput
              placeholder="Your Answer"
              value={waterBill}
              onChangeText={(value) => {
                validateNumber(value, setWaterBill, setWaterBillError);
              }}
              keyboardType="numeric"
              mode="outlined"
              outlineStyle={{ borderColor: "transparent" }}
              className="p-4"
              style={{
                backgroundColor: "#FFF",
              }}
            />
          </View>
          <HelperText type="error" visible={waterBillError !== ""}>
            {waterBillError}
          </HelperText>

          {/* Propane Bill */}
          <Text className="mt-6 text-xl">
            How much was spent on propane last month?
          </Text>
          <View className="mt-4 bg-white shadow-md shadow-black rounded-lg overflow-hidden">
            <TextInput
              placeholder="Your Answer"
              value={propaneBill}
              onChangeText={(value) => {
                validateNumber(value, setPropaneBill, setPropaneBillError);
              }}
              keyboardType="numeric"
              mode="outlined"
              outlineStyle={{ borderColor: "transparent" }}
              className="p-4"
              style={{
                backgroundColor: "#FFF",
              }}
            />
          </View>
          <HelperText type="error" visible={propaneBillError !== ""}>
            {propaneBillError}
          </HelperText>

          {/* Gas Bill */}
          <Text className="mt-6 text-xl">
            How much was your gas bill last month?
          </Text>
          <View className="mt-4 bg-white shadow-md shadow-black rounded-lg overflow-hidden">
            <TextInput
              placeholder="Your Answer"
              value={gasBill}
              onChangeText={(value) => {
                validateNumber(value, setGasBill, setGasBillError);
              }}
              keyboardType="numeric"
              mode="outlined"
              outlineStyle={{ borderColor: "transparent" }}
              className="p-4"
              style={{
                backgroundColor: "#FFF",
              }}
            />
          </View>
          <HelperText type="error" visible={gasBillError !== ""}>
            {gasBillError}
          </HelperText>

          {/* Wood Stove */}
          <Text className="mt-6 text-lg">Do you use a wood stove?</Text>
          <View className="flex-col mt-4">
            <View className="flex-row items-center">
              <RadioButton
                value="Yes"
                status={useWoodStove === "Yes" ? "checked" : "unchecked"}
                onPress={() => setUseWoodStove("Yes")}
              />
              <Text className="text-lg">Yes</Text>
            </View>
            <View className="flex-row items-center">
              <RadioButton
                value="No"
                status={useWoodStove === "No" ? "checked" : "unchecked"}
                onPress={() => setUseWoodStove("No")}
              />
              <Text className="text-lg">No</Text>
            </View>
          </View>

          {/* People in Home */}
          <Text className="mt-6 text-lg">
            How many people live in your household?
          </Text>
          <View className="mt-4">
            <Slider
              minimumValue={1}
              maximumValue={7}
              step={1}
              value={peopleInHome}
              onValueChange={setPeopleInHome}
              minimumTrackTintColor="#8E8F8E"
              maximumTrackTintColor="#D9D9D9"
              thumbTintColor="#8E8F8E"
              trackHeight={9}
              thumbSize={20}
            />
          </View>
          <View className="flex-row justify-between -mr-1.5">
            {[1, 2, 3, 4, 5, 6, "7+"].map((value) => (
              <Text key={value}>{value}</Text>
            ))}
          </View>

          {/* Emissions Display */}
          <View className="mt-8 mb-16">
            <Text className="text-xl font-bold">
              Your Individual Energy/Utilities Emissions
            </Text>
            <View className="mt-4  flex-col gap-4">
              <View className="flex-row justify-between">
                <Text>Electric Emissions:</Text>
                <Text>{electricEmissions.toFixed(1)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Water:</Text>
                <Text>{waterEmissions.toFixed(1)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Other Energy:</Text>
                <Text>{otherEnergyEmissions.toFixed(1)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Transportation + Diet:</Text>
                <Text>{transportationDietEmissions.toFixed(1)}</Text>
              </View>
              <View className="mt-2 flex-row justify-between mr-10">
                <Text className="font-bold">Total:</Text>
                <Text>{totalEmissions.toFixed(1)}</Text>
                <Text>tons CO2 per year</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Next Button */}
        <View className="flex items-end mb-10 mr-10">
          <TouchableOpacity
            onPress={() => {
              if (isFormValid) {
                router.replace("breakdown");
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
