import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
  <View className="max-w-28 mb-4">
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  </View>
);

export default CreditItem;
