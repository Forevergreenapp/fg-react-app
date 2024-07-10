import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
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
  <View className="h-44 w-28">
    <TouchableOpacity onPress={onPress} className="mb-4">
      <LinearGradient
        colors={colors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="w-28 h-28 justify-center items-center rounded-xl overflow-hidden"
      >
        <Image source={icon} style={{ height: 75, width: 70 }} />
      </LinearGradient>
      <Text className="text-base line-clamp-2 mt-1 mb-4 min-h-12">{name}</Text>
      <Text className="text-base font-bold">
        {amount.includes("?") ? "" : amount}
      </Text>
    </TouchableOpacity>
  </View>
);

export default CreditItem;
