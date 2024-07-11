import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu, Searchbar } from "react-native-paper";
import statesData from "../../constants/states.json";
import {
  Header,
  NumberInput,
  NextButton,
  QuestionSlider,
  RadioButtonGroup,
} from "../../components/carbon-calculator";

export default function EnergyCalculator() {
  const [state, setState] = useState("Pennsylvania");
  const [searchQuery, setSearchQuery] = useState("");
  const [electricBill, setElectricBill] = useState("142.73");
  const [electricBillError, setElectricBillError] = useState("");
  const [waterBill, setWaterBill] = useState("77");
  const [waterBillError, setWaterBillError] = useState("");
  const [propaneBill, setPropaneBill] = useState("134.86");
  const [propaneBillError, setPropaneBillError] = useState("");
  const [gasBill, setGasBill] = useState("77");
  const [gasBillError, setGasBillError] = useState("");
  const [useWoodStove, setUseWoodStove] = useState("Yes");
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
  const [stateData, setStateData] = useState(null);

  useEffect(() => {
    if (state) {
      const selectedState = statesData.find((s) => s.name === state);
      if (selectedState) {
        setStateData(selectedState as any);
      }
    }
  }, [state]);

  useEffect(() => {
    if (
      stateData &&
      electricBill &&
      waterBill &&
      propaneBill &&
      gasBill &&
      peopleInHome
    ) {
      // Calculate electricity emissions
      const electricityEmissions =
        ((stateData as any).stateEGridValue / 2000) *
        (parseFloat(electricBill) /
          (stateData as any).averageMonthlyElectricityBill);

      // Calculate water emissions
      const waterEmissions =
        (parseFloat(waterBill) / (stateData as any).averageMonthlyWaterBill) *
        0.0052;

      // Calculate propane emissions
      const propaneEmissions =
        (parseFloat(propaneBill) /
          (stateData as any).averageMonthlyPropaneBill) *
        0.24;

      // Calculate natural gas emissions
      const gasEmissions =
        (parseFloat(gasBill) / (stateData as any).averageMonthlyGasBill) * 2.12;

      // Calculate total energy emissions
      const totalEnergyEmissions =
        (electricityEmissions +
          waterEmissions +
          propaneEmissions +
          gasEmissions) /
        peopleInHome;

      // Update state with new emission values
      setElectricEmissions(electricityEmissions);
      setWaterEmissions(waterEmissions);
      setOtherEnergyEmissions(propaneEmissions + gasEmissions);
      setTotalEmissions(totalEnergyEmissions + transportationDietEmissions);
    }
  }, [
    stateData,
    electricBill,
    waterBill,
    propaneBill,
    gasBill,
    peopleInHome,
    transportationDietEmissions,
  ]);

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
          setElectricBill(item.averageMonthlyElectricityBill.toFixed(2));
          setWaterBill(item.averageMonthlyWaterBill.toFixed(2));
          setPropaneBill(item.averageMonthlyPropaneBill.toFixed(2));
          setGasBill(item.averageMonthlyGasBill.toFixed(2));
          setElectricBillError("");
          setWaterBillError("");
          setPropaneBillError("");
          setGasBillError("");
          setMenuVisible(false);
        }}
        title={`${item.name} (${item.abbreviation})`}
      />
    ),
    [
      setState,
      setElectricBill,
      setWaterBill,
      setPropaneBill,
      setGasBill,
      setElectricBillError,
      setWaterBillError,
      setPropaneBillError,
      setGasBillError,
    ]
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
    updateProgress();
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
        <View className="px-12">
          {/* Header */}
          <Header onBack="diet" progress={progress} title="Energy" />

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
          <NumberInput
            question="How much was your electric bill last month?"
            value={electricBill}
            onChange={(value: string) => {
              validateNumber(value, setElectricBill, setElectricBillError);
            }}
            unit="$"
            label="per month"
            error={electricBillError}
          />

          {/* Water Bill */}
          <NumberInput
            question="How much was your water bill last month?"
            value={waterBill}
            onChange={(value: string) => {
              validateNumber(value, setWaterBill, setWaterBillError);
            }}
            unit="$"
            label="per month"
            error={waterBillError}
          />

          {/* Propane Bill */}
          <NumberInput
            question="How much was spent on propane last month?"
            value={propaneBill}
            onChange={(value: string) => {
              validateNumber(value, setPropaneBill, setPropaneBillError);
            }}
            unit="$"
            label="per month"
            error={propaneBillError}
          />

          {/* Gas Bill */}
          <NumberInput
            question="How much was spent on gas last month?"
            value={gasBill}
            onChange={(value: string) => {
              validateNumber(value, setGasBill, setGasBillError);
            }}
            unit="$"
            label="per month"
            error={gasBillError}
          />

          {/* Wood Stove */}
          <RadioButtonGroup
            question="Do you use a wood stove?"
            options={["Yes", "No"]}
            value={useWoodStove}
            onChange={(value: React.SetStateAction<string>) => {
              setUseWoodStove(value);
            }}
          />

          {/* People in Home */}
          <QuestionSlider
            question="How many people live in your household?"
            value={peopleInHome}
            onChange={(value: React.SetStateAction<number>) => {
              setPeopleInHome(value);
            }}
            labels={["1", "2", "3", "4", "5", "6", "7", "8+"]}
            minimumValue={1}
            maximumValue={7}
          />

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
        <NextButton isFormValid={isFormValid} onNext={"breakdown"} />
      </SafeAreaView>
    </ScrollView>
  );
}
