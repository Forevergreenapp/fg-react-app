import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { fetchEmissionsData } from "../../api/emissions";
import {
  PieChartBreakdown,
  BarChartBreakdown,
  EarthBreakdown,
} from "../../components/breakdown";

export default function Breakdown() {
  const [emissionsPerYear, setEmissionsPerYear] = useState(0.0);
  const emissionsPerMonth = emissionsPerYear / 12;
  const [transportationEmissions, setTransportationEmissions] = useState(0.0);
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [energyEmissions, setEnergyEmissions] = useState(0.0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmissionsData("total");
      if (data !== null && data.totalEmissions !== undefined) {
        setEmissionsPerYear(data.totalEmissions);
        setTransportationEmissions(data.transportationEmissions);
        setDietEmissions(data.dietEmissions);
        setEnergyEmissions(data.energyEmissions);
      }
    };

    loadData();
  }, []);

  if (!emissionsPerYear) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header */}
        <View className="flex-row items-center gap-6 mt-4">
          <Icon
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => router.back()}
          />
          <Text className="text-4xl mt-1">Results</Text>
        </View>

        <View className="px-4 pb-6 pt-2">
          {/* Carbon Footprint */}
          <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
            <Text className="text-2xl font-bold my-2">
              Your Carbon Footprint
            </Text>
            <Text className="mb-1">Your total emissions are:</Text>
            <Text className="text-green-600 text-xl mb-2">
              {emissionsPerYear.toFixed(2)} tons co2/year
            </Text>
            <Text className="mb-1">Your total monthly emissions are:</Text>
            <Text className="text-green-600 text-xl mb-4">
              {emissionsPerMonth.toFixed(2)} tons co2/month
            </Text>
          </View>

          {/* Emission Breakdown */}
          <PieChartBreakdown
            names={["Transportation", "Diet", "Energy"]}
            values={[transportationEmissions, dietEmissions, energyEmissions]}
            colors={["#44945F", "#AEDCA7", "#66A570"]}
          />

          {/* Average American */}
          <BarChartBreakdown
            names={["You", "Average American"]}
            values={[emissionsPerYear, 21]}
            colors={["#44945F", "#A9A9A9"]}
          />

          {/* Earth Breakdown */}
          <EarthBreakdown emissions={emissionsPerYear} />

          {/* Call to Action */}
          <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
            <Text className="text-4xl font-bold text-center mb-2">
              Help us help you change the World 🌍
            </Text>
            <Text className="text-center mb-4 text-lg">
              Support green projects around the world!
            </Text>
            <View
              className="bg-[#44945F] rounded-full py-3 mb-4"
              style={{ backgroundColor: "#44945F" }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push("(tabs)/carbon-credit");
                }}
              >
                <Text className="text-white text-center text-lg font-bold">
                  Learn More
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-center mb-4 text-lg">
              Build your legacy and leave a lasting impact by planting your own
              forest.
            </Text>
            <View
              className="bg-[#44945F] rounded-full py-3 mb-6"
              style={{ backgroundColor: "#44945F" }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.replace("(misc)/tree-planting");
                }}
              >
                <Text className="text-white text-center text-lg font-bold">
                  Start the Pledge today!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Next Button */}
      <View className="flex items-end mb-10 mr-10">
        <TouchableOpacity
          onPress={() => {
            router.replace("home");
          }}
        >
          <View className="py-3 px-4 rounded-full border-2 h-16 w-16 border-black bg-[#AEDCA7]">
            <Icon name="arrow-right" size={30} color={"#000"} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
