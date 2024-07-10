import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// TODO: Host the carbon credit data in a db (prolly Firestore) and access it with API call
import carbonCredits from "../constants/carbon-credits.json";
import Icon from "react-native-vector-icons/Feather";
import PagerView from "react-native-pager-view";

const images = {
  "canadian-energy-and-waste": require("../assets/images/carbon-credits/canadian-energy-and-waste.png"),
  "panoma-hydroelectric": require("../assets/images/carbon-credits/panoma-hydroelectric.png"),
  "the-russas-project": require("../assets/images/carbon-credits/the-russas-project.png"),
  "colombian-reforestation": require("../assets/images/carbon-credits/colombian-reforestation.png"),
  placeholder: require("../assets/images/carbon-credits/placeholder.png"),
};

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
    // Could not get tailwind to work here. Really inconsistent and dissapointing
    <View style={{ backgroundColor: "#EEEEEE", borderRadius: 20, padding: 15, margin: 20}}>
      <View>
        {/* Title */}
        <Text className="text-xl font-bold mb-2">{project.name}</Text>

        {/* Description */}
        <PagerView
          ref={pagerRef}
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
          style={{ flex: 1, height: expanded ? 520 : 140 }}
        >
          {project.details.map((detail, index) => (
            <View key={index}>
              <Text className="text-lg font-bold mb-2">{detail.title}</Text>
              {/* Basically bold the words before a colon, unless there isn't a colon. This is mainly for Key Features */}
              <View
                style={{
                  maxHeight: expanded ? undefined : 80,
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
      <View className="flex-row justify-center items-center mt-4 mb-4 gap-4">
        {/* Arrow Left */}
        <TouchableOpacity onPress={() => navigateDetails("prev")}>
          <Icon name="chevron-left" size={48}></Icon>
        </TouchableOpacity>

        {/* Coin Image */}
        <Image
          source={images[project.icon as keyof typeof images]}
          style={{ height: 75, width: 70 }}
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
          <View className="flex-col ml-2">
            <Text className="leading-tight">per ton</Text>
            <Text className="leading-tight">CO2</Text>
          </View>
        </View>

        {/* Quantity */}
        <View className="">
          <View className="flex-row items-center mt-2">
            <TouchableOpacity
              onPress={decrementQuantity}
              className="bg-black w-8 h-8 rounded-lg items-center justify-center"
            >
              <Icon name="minus" size={24} color={"#fff"}></Icon>
            </TouchableOpacity>
            <Text
              className="text-xl font-bold"
              style={{ height: 20, width: 20, textAlign: "center" }}
            >
              {quantity}
            </Text>
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
      <View className="flex-row items-center gap-8 justify-end">
        <Text className="text-3xl font-bold">Total:</Text>
        <Text className="text-3xl">
          $
          {((project.cost * quantity) / 100).toFixed(2).endsWith(".00")
            ? ((project.cost * quantity) / 100).toFixed(2).slice(0, -3)
            : ((project.cost * quantity) / 100).toFixed(2)}
        </Text>
        <TouchableOpacity className="bg-[#409858] p-2 rounded-full flex-row justify-center align-baseline">
          <Icon
            name="shopping-cart"
            size={18}
            color={"#fff"}
            className="p-2"
          ></Icon>
          <Text className="text-white font-bold p-2">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProjectCard;
