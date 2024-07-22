import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

const Sitemap = () => {
  return (
    <View className="flex flex-col m-16 gap-4">
      <Link href="/get-started" className="text-xl underline">
        Get Started Page
      </Link>
      <Link href="/referral" className="text-xl underline">
        Referral Page
      </Link>
      <Link href="/home" className="text-xl underline">
        Home Page
      </Link>
      <Link href="/pre-survey" className="text-xl underline">
        Carbon Calculator Page
      </Link>
      <Link href="/calculating" className="text-xl underline">
        Calculating Page
      </Link>
      <Link href="/breakdown" className="text-xl underline">
        Carbon Calculator Breakdown
      </Link>
      <Link href="/carbon-credit" className="text-xl underline">
        Carbon Credit Screen
      </Link>
      <Link href="/my-profile" className="text-xl underline">
        Profile Page
      </Link>
      <Link href="/offset-now" className="text-xl underline">
        Offset Now!
      </Link>
      <Link href="/plant-a-tree" className="text-xl underline">
        Plant a tree
      </Link>
      <Link href="/settings" className="text-xl underline">
        Settings
      </Link>
    </View>
  );
};

export default Sitemap;
