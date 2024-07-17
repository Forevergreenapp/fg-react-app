import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PreSurveyScreen = () => {
  return (
    <View className="p-6 bg-white" style={{ flex: 1 }}>
      <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full -bottom-8 -left-1/4" />
      <View className="absolute w-[200px] h-[200px] bg-[#409858] rounded-full -top-32 -right-8" />

      <View className="flex items-center mt-24">
        <Text className="text-5xl font-bold my-2">
          Forever<Text className="text-primary">green</Text>
        </Text>
      </View>

      <View className="bg-[#eeeeee] mt-32 p-4 rounded-3xl">
        <Text className="text-4xl mt-4 font-bold text-center">Welcome!</Text>
        <Text className="text-xl text-center mt-4">
          Before we begin, we’ll ask you a few quick questions about your
          transportation, diet, and energy use to help calculate your carbon
          footprint. Completing this survey will give you personalized tips to
          reduce your impact on the environment.
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("transportation")}
          className="mt-8 mx-[90px] py-3 px-8 bg-[#409858] rounded-full active:bg-[#3a8a4f]"
        >
          <Text className="text-white text-center text-2xl font-bold">
            Begin Survey
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreSurveyScreen;
