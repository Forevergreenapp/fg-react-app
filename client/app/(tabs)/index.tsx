import React from "react";
import { View, Text, Button, StatusBar, Image } from "react-native";
import { vars } from "nativewind";

const userTheme = vars({
  "--color-primary": "255 0 0",
});

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-5">
      <StatusBar barStyle="dark-content" />
      <View className="grow items-center justify-center gap-24">
        <Text className="text-5xl font-bold my-2">
          Forever<Text className="text-[#59A56D]">green</Text>
        </Text>
        <Image
          className="w-[48rem] h-96"
          source={require("../../assets/images/tree-logo.png")}
        />
      </View>
      <View className="w-full mb-8">
        <Button
          onPress={() => alert("Get Started")}
          title="Get Started"
          color="#409858"
        />
        <Text className="mt-4 text-center text-base">
          Already helping our planet?{" "}
          <Text
            className="font-bold text-blue-500"
            onPress={() => alert("Log In")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}
