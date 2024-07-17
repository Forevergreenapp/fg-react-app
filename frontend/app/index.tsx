import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

const Sitemap = () => {
  return (
    <View className="flex flex-col m-16 gap-4">
      <Link href="/(auth)/get-started" className="text-xl underline">
        Get Started Page
      </Link>
      <Link href="/(misc)/referral" className="text-xl underline">
        Referral Page
      </Link>
      <Link href="/(tabs)/home" className="text-xl underline">
        Home Page
      </Link>
      <Link
        href="/(carbon-calculator)/pre-survey"
        className="text-xl underline"
      >
        Carbon Calculator Page
      </Link>
      <Link
        href="/(carbon-calculator)/calculating"
        className="text-xl underline"
      >
        Calculating Page
      </Link>
      <Link href="/(carbon-calculator)/breakdown" className="text-xl underline">
        Carbon Calculator Breakdown
      </Link>
      <Link href="/(tabs)/carbon-credit" className="text-xl underline">
        Carbon Credit Screen
      </Link>
      <Link href="/(tabs)/profile" className="text-xl underline">
        Profile Page
      </Link>
      <Link href="/google-sign-in-test" className="text-xl underline">
        Google Sign In Test
      </Link>
    </View>
  );
};

export default Sitemap;
