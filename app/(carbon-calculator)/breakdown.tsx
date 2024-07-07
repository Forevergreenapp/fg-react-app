import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import PieChart from "./pie-chart";
import BarChart from "./bar-chart";

export default function Breakdown() {
  // TODO: Get and set the emissions from the calculator algorithm API
  const emissionsPerYear = 16;
  const emissionsPerMonth = (emissionsPerYear / 12).toFixed(2);
  const transportationEmissions = 30;
  const dietEmissions = 20;
  const energyEmissions = 50;
  const earthsRequired = parseFloat((emissionsPerYear / 6.4).toFixed(2)); // 6.4 tonne of CO2 per year as the target
  const wholeEarths = Math.floor(earthsRequired);
  const partialEarth = parseFloat((earthsRequired - wholeEarths).toFixed(2));

  const renderEarths = () => {
    const earthImages = [];
    for (let i = 0; i < wholeEarths; i++) {
      earthImages.push(
        <Image
          key={`whole-${i}`}
          source={require("../../assets/images/earth.png")}
          style={{ height: 64, width: 64, marginRight: 8 }}
        />
      );
    }
    if (partialEarth > 0) {
      earthImages.push(
        <View
          key="partial"
          style={{
            overflow: "hidden",
            height: 64,
            width: 64 * partialEarth, // Adjust width to show partial Earth
            marginRight: 8,
          }}
        >
          <Image
            source={require("../../assets/images/earth.png")}
            style={{ height: 64, width: 64 }}
          />
        </View>
      );
    }

    // Create rows of images
    const rows = [];
    const itemsPerRow = 4;
    for (let i = 0; i < earthImages.length; i += itemsPerRow) {
      const rowItems = earthImages.slice(i, i + itemsPerRow);
      rows.push(
        <View key={`row-${i}`} className="flex flex-row mb-2">
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header */}
        <View className="flex-row items-center gap-6 mt-4">
          <Icon
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => router.replace("/(auth)/getstarted")}
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
              {emissionsPerYear} tons co2/year
            </Text>
            <Text className="mb-1">Your total monthly emissions are:</Text>
            <Text className="text-green-600 text-xl mb-4">
              {emissionsPerMonth} tons co2/month
            </Text>
          </View>

          {/* Emission Breakdown */}
          <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
            <Text className="text-2xl font-bold mb-4">
              Your Emission Breakdown
            </Text>
            <View className="mx-auto mb-4">
              <PieChart
                widthAndHeight={200}
                series={[
                  transportationEmissions,
                  dietEmissions,
                  energyEmissions,
                ]}
                sliceColor={["#44945F", "#AEDCA7", "#66A570"]}
                coverRadius={0.45}
              />
            </View>
            <View className="flex-row justify-center mb-4">
              <View className="flex-row items-center mr-4">
                <View className="w-4 h-4 bg-[#44945F] mr-2" />
                <Text>Transportation</Text>
              </View>
              <View className="flex-row items-center mr-4">
                <View className="w-4 h-4 bg-[#AEDCA7] mr-2" />
                <Text>Diet</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-[#66A570] mr-2" />
                <Text>Energy</Text>
              </View>
            </View>
          </View>

          {/* Average American */}
          <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
            <Text className="text-2xl font-bold mb-4">
              You vs the Average American
            </Text>
            <View className="mx-auto mb-5">
              <BarChart
                value1={emissionsPerYear}
                value2={21}
                label1="You"
                label2="Average American"
                maxValue={Math.max(
                  emissionsPerYear + emissionsPerYear * 0.1,
                  22
                )}
              />
            </View>
          </View>

          {/* Earth Breakdown */}
          <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
            <Text className="text-4xl font-bold mb-2 text-center">
              Earth Breakdown
            </Text>
            <Text className="mb-4 text-lg">
              If everyone lived like you we would need {earthsRequired} Earths!
            </Text>
            <View className="mb-6">{renderEarths()}</View>
          </View>

          {/* Call to Action */}
          <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
            <Text className="text-4xl font-bold text-center mb-2">
              Help us help you change the World 🌍
            </Text>
            <Text className="text-center mb-4 text-lg">
              Support green projects around the world!
            </Text>
            <View className="bg-[#44945F] rounded-full py-3 mb-4">
              <TouchableOpacity
                onPress={() => {
                  router.replace("carbon-credit");
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
            <View className="bg-[#44945F] rounded-full py-3 mb-6">
              <TouchableOpacity
                onPress={() => {
                  router.replace("tree-planting");
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
