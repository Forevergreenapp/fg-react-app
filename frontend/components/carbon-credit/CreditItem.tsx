import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FGCoin } from "@/constants/Images";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface CreditItemProps {
  name: string;
  price: number;
  image: string;
  colors: string[];
  onPress: () => void;
}

const CreditItem: React.FC<CreditItemProps> = ({
  name,
  price,
  image,
  colors,
  onPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <LinearGradient
        colors={colors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <Image
          source={image}
          placeholder={{ blurhash }}
          style={styles.icon}
          contentFit="cover"
        />
      </LinearGradient>
      <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
      <View style={styles.amountContainer}>
        <Image source={FGCoin} style={styles.currency} />
        <Text style={styles.amount}>{price}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 176, // 44 * 4
    width: 112, // 28 * 4
  },
  touchable: {
    marginBottom: 16, // 4 * 4
  },
  gradient: {
    width: 112, // 28 * 4
    height: 112, // 28 * 4
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12, // Equivalent to rounded-xl
    overflow: "hidden",
  },
  icon: {
    height: 75,
    width: 70,
  },
  name: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
    minHeight: 48, // 12 * 4
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currency: {
    height: 17,
    width: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreditItem;
