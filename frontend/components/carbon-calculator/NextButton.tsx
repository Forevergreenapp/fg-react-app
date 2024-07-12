import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";

const NextButton = ({
  isFormValid,
  onNext,
  data,
  type,
}: {
  isFormValid: boolean;
  onNext: string;
  data: any;
  type: string;
}) => {
  const router = useRouter();

  const saveData = async () => {
    const auth = getAuth();
    const db = getFirestore();

    if (!auth.currentUser) {
      console.error("No user logged in");
      return;
    }

    const userId = auth.currentUser.uid;
    const currentMonth = dayjs().format("YYYY-MM");
    const userDocRef = doc(
      collection(db, "users", userId, "surveys"),
      currentMonth
    );

    try {
      switch (type) {
        case "energy":
          const totalData = {
            transportationEmissions: data.transportationEmissions,
            dietEmissions: data.dietEmissions,
            energyEmissions: data.energyEmissions,
            totalEmissions: data.totalEmissions,
          };
          delete data.totalEmissions;
          delete data.transportationEmissions;
          delete data.dietEmissions;
          await setDoc(
            userDocRef,
            {
              energyData: data,
              totalData: totalData,
            },
            { merge: true }
          );
          break;
        case "transportation":
          await setDoc(
            userDocRef,
            {
              transportationData: data,
            },
            { merge: true }
          );
          break;
        case "diet":
          await setDoc(
            userDocRef,
            {
              dietData: data,
            },
            { merge: true }
          );
          break;
        default:
          break;
      }

      console.log(`${type} data saved successfully`);
    } catch (error) {
      console.error(`Error saving ${type} data:`, error);
      throw error;
    }
  };

  const handlePress = async () => {
    if (isFormValid) {
      try {
        await saveData();
        router.push(onNext);
      } catch (error) {
        console.error("Error saving data:", error);
        // Might want to show an error message to the user here
      }
    }
  };

  return (
    <View className="flex items-end mb-10 mr-10">
      <TouchableOpacity onPress={handlePress}>
        <View
          className={`py-3 px-4 rounded-full border-2 h-16 w-16 ${
            isFormValid
              ? "border-black bg-[#AEDCA7]"
              : "border-gray-300 bg-gray-300"
          }`}
        >
          <Icon
            name="arrow-right"
            size={30}
            color={isFormValid ? "#000" : "#AAA"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;
