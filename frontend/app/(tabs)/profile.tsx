import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { fetchEmissionsData } from "../../api/emissions";

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
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();
  const [totalEmissions, setTotalEmissions] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/(auth)/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmissionsData({ type: "total" });
      if (data) {
        setTotalEmissions(data.totalEmissions);
      }
    };

    loadData();
  }, []);

  if (!totalEmissions || !user) {
    return <Text>Loading...</Text>;
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          signOut(auth)
            .then(() => {
              router.replace("/(auth)/login");
            })
            .catch((error) => {
              Alert.alert("Error", "Failed to logout. Please try again.");
            });
        },
      },
    ]);
  };

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
            <Text className="text-lg font-semibold">
              {user.displayName || "User"}
            </Text>
            <Text className="">{user.email}</Text>
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
            <Text className="text-xl font-semibold">
              {totalEmissions.toFixed(2)} tons of CO₂
            </Text>
            <TouchableOpacity className="bg-[#409858] px-4 py-2 rounded-full">
              <Text className="text-white">Offset Now!</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Manage Subscriptions */}
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

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-400 p-4 rounded-lg mt-4"
        >
          <Text className="text-center font-bold text-2xl">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
