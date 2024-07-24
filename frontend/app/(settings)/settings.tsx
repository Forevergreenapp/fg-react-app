import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { router, useRouter } from "expo-router";
import { fetchEmissionsData } from "../../api/emissions";
import { Image } from "expo-image";
import BackButton from "../../components/BackButton";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const SettingsItem = ({ title, screen }: { title: string, screen: string }) => (
  <Pressable className="flex-row items-center justify-between bg-gray-200 p-4 rounded-lg mb-3" onPress={() => router.push(screen)}>
    <Text className="text-xl font-semibold">{title}</Text>
    <Icon name="chevron-right" size={48} />
  </Pressable>
);

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();
  const [totalEmissions, setTotalEmissions] = useState(0);
  const profileIcon = auth.currentUser?.photoURL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmissionsData();
      if (data) {
        const totalData = data.totalData;
        setTotalEmissions(totalData.totalEmissions);
      }
    };

    loadData();
  }, []);

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
              router.replace("/login");
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
        <BackButton />
        {/* Header */}
        <View className="flex items-center mt-8">
          <Text className="text-5xl font-extrabold">
            Forever<Text className="text-[#409858]">green</Text>
          </Text>
          <Text className="text-3xl font-bold text-center mb-3">
            Settings
          </Text>
        </View>

        {/* Profile Info */}
        <View className="p-4 rounded-lg mb-3 flex-row items-center">
          {/* <ProfileIcon /> */}
          {profileIcon ? (
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 9999,
                marginRight: 16,
              }}
              source={profileIcon}
              placeholder={blurhash}
              contentFit={"cover"}
            />
          ) : (
            <Text className="text-4xl mr-4">👤</Text>
          )}
          <View className="ml-3">
            <Text className="text-2xl font-semibold">
              {user?.displayName || "Guest"}
            </Text>
            <Text className="text-lg">{user?.email || ""}</Text>
          </View>
        </View>

        {/* Settings */}
        <SettingsItem title="Profile Settings" screen="/profile-settings" />
        <SettingsItem title="Payment Methods" screen="/payment-methods" />
        <SettingsItem title="Purchase History" screen="/purchase-history" />
        <SettingsItem title="Notifications" screen="/notifications-settings" />

        {/* Carbon Footprint */}
        <View className="p-4 rounded-lg mb-3 mt-8 bg-gray-200">
          <Text className="text-2xl text-center mb-3 font-bold">
            Your carbon footprint...
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold text-red">
              {totalEmissions.toFixed(2)}<Text className="text-xl font-semibold"> tons of CO₂</Text>
            </Text>
            <Pressable
              className="bg-[#409858] rounded-full px-7 py-3"
              onPress={() => router.push("/offset-now")}
            >
              <Text className="text-white text-xl font-semibold">Offset Now!</Text>
            </Pressable>
          </View>
        </View>

        {/* Manage Subscriptions */}
        <View className="bg-gray-200 p-4 rounded-lg">
          <Text className="text-2xl text-center mb-3 font-bold">
            Manage Subscriptions
          </Text>
          <View className="flex-row justify-around">
            <Pressable onPress={() => router.push("/(subscriptions)/subscriptions-settings")} className="items-center">
              <Text className="text-3xl">⚙️</Text>
              <Text className="font-semibold">Settings</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(subscriptions)/subscriptions")} className="items-center">
              <Text className="text-3xl">🛒</Text>
              <Text className="font-semibold">View Subscriptions</Text>
            </Pressable>
          </View>
        </View>

        {/* Logout Button */}
        <Pressable onPress={handleLogout} className="p-3 rounded-lg mt-11 bg-gray-200">
          <Text className="text-center font-bold text-2xl">Logout</Text>
        </Pressable>

        {/* Delete Account Button */}
        <Pressable className="p-3 rounded-lg mt-4 bg-red-700">
          <Text className="text-center font-bold text-white text-2xl">Delete Account</Text>
        </Pressable>
        
      </View>
    </ScrollView>
  );
}
