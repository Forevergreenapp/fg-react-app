import React from "react";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";

const Header = ({ onBack, progress, title }: any) => {
  const theme = useTheme();

  return (
    <>
      <View className="flex-row items-center gap-6 mt-4">
        <Icon
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => router.replace(onBack)}
        />
        <View className="w-5/6">
          <Progress.Bar
            progress={progress}
            width={null}
            color="#AEDCA7"
            unfilledColor="#FFF"
            borderColor={theme.colors.onBackground}
            borderWidth={1.5}
            height={15}
            borderRadius={9999}
          />
        </View>
      </View>
      <Text className="text-4xl mt-6">{title}</Text>
    </>
  );
};

export default Header;
