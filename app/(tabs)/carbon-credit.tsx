import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// TODO: Host the carbon credit data in a db (prolly Firestore) and access it with API call
import carbonCredits from "../../constants/carbon-credits.json";
import Icon from "react-native-vector-icons/Feather";
import PagerView from "react-native-pager-view";

const images = {
  "canadian-energy-and-waste": require("../../assets/images/carbon-credits/canadian-energy-and-waste.png"),
  "panoma-hydroelectric": require("../../assets/images/carbon-credits/panoma-hydroelectric.png"),
  "the-russas-project": require("../../assets/images/carbon-credits/the-russas-project.png"),
  "colombian-reforestation": require("../../assets/images/carbon-credits/colombian-reforestation.png"),
  placeholder: require("../../assets/images/carbon-credits/placeholder.png"),
};

const CreditItem = ({
  name,
  amount,
  icon,
  colors,
  onPress,
}: {
  name: string;
  amount: string;
  icon: ImageSourcePropType;
  colors: string[];
  onPress: () => void;
}) => (
  <TouchableOpacity className="max-w-28" onPress={onPress}>
    <View className="max-w-28 mb-4">
      <View className="w-28 h-28 rounded-xl overflow-hidden">
        <LinearGradient
          colors={colors}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="w-full h-full justify-center items-center"
        >
          <Image source={icon} className="h-[70%] w-[65%]" />
        </LinearGradient>
      </View>
      <Text className="text-base line-clamp-2 mt-1 mb-4 min-h-12">{name}</Text>
      <Text className="text-base font-bold">
        {amount.includes("?") ? "" : amount}
      </Text>
    </View>
  </TouchableOpacity>
);

const ProjectCard = ({
  project,
}: {
  project: (typeof carbonCredits)[number];
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const pagerRef = useRef<PagerView>(null);

  const toggleExpanded = () => setExpanded(!expanded);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const navigateDetails = (direction: "next" | "prev") => {
    if (direction === "next") {
      pagerRef.current?.setPage((currentPage + 1) % project.details.length);
    } else {
      pagerRef.current?.setPage(
        (currentPage - 1 + project.details.length) % project.details.length
      );
    }
  };

  return (
    <View className="bg-gray-100 rounded-lg m-6 shadow-md">
      <View className="p-4">
        {/* Title */}
        <Text className="text-xl font-bold mb-2">{project.name}</Text>

        {/* Description */}
        <PagerView
          ref={pagerRef}
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
          useNext={false}
          overdrag={true}
        >
          {project.details.map((detail, index) => (
            <View key={index}>
              <Text className="text-lg font-bold mb-2">{detail.title}</Text>
              {/* Basically bold the words before a colon, unless there isn't a colon. This is mainly for Key Features */}
              <View
                style={{
                  maxHeight: expanded ? undefined : 60,
                  overflow: "hidden",
                }}
              >
                <Text className="text-lg leading-tight">
                  {detail.content.split("\n").map((item, idx) => {
                    const parts = item.split(":");
                    return (
                      <Text key={idx}>
                        {parts.length > 1 ? (
                          <>
                            <Text style={{ fontWeight: "bold" }}>
                              {parts[0]}:
                            </Text>
                            {parts.slice(1).join(":")}
                          </>
                        ) : (
                          item
                        )}
                        {"\n"}
                      </Text>
                    );
                  })}
                </Text>
              </View>
              {detail.content.length > 60 && (
                <TouchableOpacity onPress={toggleExpanded} className="mt-2">
                  <Text className="text-blue-500">
                    {expanded ? "Show Less" : "Show More"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </PagerView>
      </View>

      {/* Controls */}
      <View className="flex-row justify-between items-center -mx-2">
        {/* Arrow Left */}
        <TouchableOpacity onPress={() => navigateDetails("prev")}>
          <Icon name="chevron-left" size={48}></Icon>
        </TouchableOpacity>

        {/* Coin Image */}
        <Image
          source={images[project.icon as keyof typeof images]}
          className="w-[70px] h-[75px] -ml-4"
        />

        {/* Dollar per ton of CO2 */}
        <View className="flex-row gap-2 items-baseline">
          <Text className="text-2xl font-bold leading-tight">
            {/* The cost is in cents so $10.00 is 1000 cents. If the cents are 0, then we don't display the cents */}
            $
            {(project.cost / 100).toFixed(2).endsWith(".00")
              ? (project.cost / 100).toFixed(2).slice(0, -3)
              : (project.cost / 100).toFixed(2)}
          </Text>
          <View className="flex-col">
            <Text className="leading-tight">per ton</Text>
            <Text className="leading-tight">CO2</Text>
          </View>
        </View>

        {/* Quantity */}
        <View className="my-12 -mr-4">
          <View className="flex-row items-center mt-2">
            <TouchableOpacity
              onPress={decrementQuantity}
              className="bg-black w-8 h-8 rounded-lg items-center justify-center"
            >
              <Icon name="minus" size={24} color={"#fff"}></Icon>
            </TouchableOpacity>
            <Text className="mx-2 text-xl font-bold">{quantity}</Text>
            <TouchableOpacity
              onPress={incrementQuantity}
              className="bg-black w-8 h-8 rounded-lg items-center justify-center"
            >
              <Icon name="plus" size={24} color={"#fff"}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Arrow */}
        <TouchableOpacity onPress={() => navigateDetails("next")}>
          <Icon name="chevron-right" size={48}></Icon>
        </TouchableOpacity>
      </View>

      {/* Total & Add to Cart */}
      <View className="flex-row ml-auto items-center gap-8">
        <Text className="text-3xl font-bold">Total:</Text>
        <Text className="text-3xl">
          $
          {((project.cost * quantity) / 100).toFixed(2).endsWith(".00")
            ? ((project.cost * quantity) / 100).toFixed(2).slice(0, -3)
            : ((project.cost * quantity) / 100).toFixed(2)}
        </Text>
        <TouchableOpacity className="bg-[#409858] px-4 py-2 rounded-full flex-row gap-4 justify-center align-baseline">
          <Icon
            name="shopping-cart"
            size={18}
            color={"#fff"}
            className="pt-1.5"
          ></Icon>
          <Text className="text-white font-bold py-1.5">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
          <Text className="font-bold text-white text-center text-xl">$20/Month</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
