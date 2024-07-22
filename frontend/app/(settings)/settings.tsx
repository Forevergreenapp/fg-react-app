import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { fetchEmissionsData } from "../../api/emissions";
import { Image } from "expo-image";
import BackButton from "../../components/BackButton";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
          {profileIcon ? (
            <Image
              style={{
                width: 40,
                height: 40,
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
            <Text className="text-lg font-semibold">
              {user?.displayName || "Guest"}
            </Text>
            <Text className="">{user?.email || ""}</Text>
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
            <TouchableOpacity
              className="bg-[#409858] rounded-full"
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
              onPress={() => router.push("/offset-now")}
            >
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
          className="p-4 rounded-lg mt-4"
          style={{ backgroundColor: "#FF4141" }}
        >
          <Text className="text-center font-bold text-2xl">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
