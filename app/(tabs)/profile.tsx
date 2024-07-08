import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

const SettingsItem = ({ title }: { title: string }) => (
  <TouchableOpacity>
    <LinearGradient
      colors={["#F8F8F8", "#BDFFFF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-row items-center justify-between bg-blue-50 p-6 rounded-lg mb-3"
    >
      <Text className="text-lg font-semibold">{title}</Text>
      <Icon name="chevron-right" size={48} />
    </LinearGradient>
  </TouchableOpacity>
);

export default function ProfileSettings() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header */}
        <View className="flex items-center mt-8 mb-6">
          <Text className="text-5xl font-bold">
            Forever<Text className="text-[#409858]">green</Text>
          </Text>
          <Text className="text-3xl font-bold text-center mb-3">
            Profile/Settings
          </Text>
        </View>

        {/* Profile Info */}
        <LinearGradient
          colors={["#F8F8F8", "#BDFFFF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="bg-blue-50 p-6 rounded-lg mb-3 flex-row items-center"
        >
          {/* <ProfileIcon /> */}
          <Text className="text-4xl mr-4">👤</Text>
          <View className="ml-3">
            <Text className="text-lg font-semibold">Username</Text>
            <Text className="">useremail@email.com</Text>
          </View>
        </LinearGradient>

        {/* Settings */}
        <SettingsItem title="Personal Info" />
        <SettingsItem title="Payment Methods" />
        <SettingsItem title="Purchase History" />
        <SettingsItem title="Notifications" />

        {/* Carbon Footprint */}
        <LinearGradient
          colors={["#F8F8F8", "#BDFFFF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="p-4 rounded-lg mb-3"
        >
          <Text className="text-lg mb-2 font-semibold">
            Your carbon footprint...
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold">16 tons of CO₂</Text>
            <TouchableOpacity className="bg-[#409858] px-4 py-2 rounded-full">
              <Text className="text-white">Offset Now!</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#F8F8F8", "#BDFFFF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <Text className="text-lg mb-2 font-semibold">
            Manage Subscriptions
          </Text>
          <View className="flex-row justify-around">
            <TouchableOpacity className="items-center">
              <Text className="text-3xl">⚙️</Text>
              <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <Text className="text-3xl">🛒</Text>
              <Text>View Subscriptions</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
