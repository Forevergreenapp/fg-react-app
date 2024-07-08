import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// TODO: Host the carbon credit data in a db (prolly Firestore) and access it with API call
import carbonCredits from "../../constants/carbon-credits.json";
import CreditItem from "../../components/CreditItem";
import ProjectCard from "../../components/ProjectCard";

const images = {
  "canadian-energy-and-waste": require("../../assets/images/carbon-credits/canadian-energy-and-waste.png"),
  "panoma-hydroelectric": require("../../assets/images/carbon-credits/panoma-hydroelectric.png"),
  "the-russas-project": require("../../assets/images/carbon-credits/the-russas-project.png"),
  "colombian-reforestation": require("../../assets/images/carbon-credits/colombian-reforestation.png"),
  placeholder: require("../../assets/images/carbon-credits/placeholder.png"),
};

export default function CarbonCreditScreen() {
  const [selectedProject, setSelectedProject] = useState(carbonCredits[0]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-6 pb-4">
        <View className="flex items-center mt-8">
          <Text className="text-5xl font-bold">
            Forever<Text className="text-[#409858]">green</Text>
          </Text>
          <Text className="text-3xl font-bold text-center mb-3">
            Carbon Credits
          </Text>
          <Text className="text-lg text-center">
            Click on a project to learn more or purchase
          </Text>
        </View>
      </View>

      {/* Credits */}
      <View className="flex-row flex-wrap justify-between mb-5 px-6">
        {carbonCredits.map((credit, index) => (
          <CreditItem
            key={index}
            name={credit.name}
            amount={credit.amount}
            icon={images[credit.icon as keyof typeof images]}
            colors={credit.colors}
            onPress={() => setSelectedProject(credit)}
          />
        ))}
      </View>

      {/* Project Info */}
      <ProjectCard project={selectedProject} />

      {/* Subscription */}
      <View className="bg-gray-100 rounded-lg p-4 m-6">
        <Text className="text-3xl font-bold mb-6 text-center">
          Carbon Credit Subscription
        </Text>
        <Text className="text-lg mb-2 text-center leading-tight">
          The Forevergreen carbon credit subscription includes the purchase of
          the nearest whole number of carbon credits to make sure you are net
          zero every month. This is the easiest way to reduce your impact on the
          planet and support awesome climate projects!
        </Text>
        <TouchableOpacity className="bg-[#409858] px-8 py-4 mx-auto rounded-full">
          <Text className="font-bold text-white text-center text-xl">
            $20/Month
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
