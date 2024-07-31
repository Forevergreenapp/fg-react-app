import React from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function GetStartedScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-5">
      <StatusBar barStyle="dark-content" />
      <View className="grow items-center justify-center gap-24">
        <Text className="text-5xl font-bold my-2">
          Forever<Text className="text-primary">green</Text>
        </Text>
        <Image
          className="w-[48rem] h-96"
          source={require("../../assets/images/tree-logo.png")}
        />
      </View>
      <View className="w-full mb-8">
        <TouchableOpacity
          onPress={() => router.push("/signup")}
          className="bg-primary rounded-full p-6 px-12"
        >
          <Text className="text-onPrimary text-center text-3xl font-bold">
            Get Started
          </Text>
        </TouchableOpacity>
        <View className="mt-4 flex flex-row justify-center">
          <Text className="text-xl text-center font-extrabold">
            Already helping our planet?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="mr-8"
          >
            <Text className="font-extrabold underline text-xl">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
