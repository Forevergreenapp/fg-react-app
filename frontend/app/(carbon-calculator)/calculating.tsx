import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const icons = ["hourglass-start", "hourglass-half", "hourglass-end"];

const CalculatingScreen = () => {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000); // Change icon every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="p-6 bg-white" style={{ flex: 1 }}>
      <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full -bottom-8 -right-1/4" />
      <View className="absolute w-[200px] h-[200px] bg-[#409858] rounded-full -top-32 -left-1/4" />

      <View className="flex items-center mt-24">
        <Text className="text-5xl font-bold my-2">
          Forever<Text className="text-primary">green</Text>
        </Text>
      </View>

      <View className="mt-40">
        <Text className="text-4xl mt-4 font-bold text-center">
          Calculating your result
        </Text>
        <View className="flex items-center justify-center mt-8">
          <Icon name={icons[iconIndex]} size={100} color="#409858" />
        </View>
      </View>
    </View>
  );
};

export default CalculatingScreen;
