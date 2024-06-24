import React from 'react';
import { View } from 'react-native';
import { Link } from "expo-router";

const Sitemap = ({ navigation }: any) => {
  return (
    <View className="flex flex-col m-16 gap-4">
      <Link href="/(auth)/getstarted" className="text-xl underline">Get Started Page</Link>
      <Link href="/(misc)/referral" className="text-xl underline">Referral Page</Link>
      <Link href="/(tabs)/home" className="text-xl underline">Home Page</Link>
      <Link href="/(carbon-calculator)/transportation" className="text-xl underline">Carbon Calculator Page</Link>
    </View>
  );
};

export default Sitemap;
