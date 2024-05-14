import React from "react";
import { View, Text, Pressable, StatusBar, Image } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      <StatusBar barStyle="dark-content" />
      <View className="grow items-center justify-center gap-24">
        <Text className="text-5xl font-bold my-2">
          Forever<Text className="text-primary">green</Text>
        </Text>
        <Image
          className="w-[48rem] h-96"
          source={require("../assets/images/tree-logo.png")}
        />
      </View>
      <View className="w-full mb-8">
        <Link
          href="/register"
          asChild
          className="bg-primary rounded-full p-6 hover:bg-primary/90 px-12"
        >
          <Text className="text-onPrimary text-center text-3xl font-bold">
            Get Started
          </Text>
        </Link>
        <Text className="mt-4 text-xl text-center font-extrabold">
          Already helping our planet?{" "}
          <Link href="/login" className="mr-8">
            <Text className="font-extrabold underline">Log in</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
