import React from "react";
import { View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

type PieChartProps = {
  names: string[];
  values: number[];
  colors: string[];
};

const PieChartBreakdown = ({ names, values, colors }: PieChartProps) => {
  const screenWidth = Dimensions.get("window").width;

  const data = names.map((name, index) => ({
    name,
    value: values[index],
    color: colors[index],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
      <Text className="text-2xl font-bold mb-4">Your Emission Breakdown</Text>
      <View className="mx-auto mb-4">
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="45"
          hasLegend={false}
        />
      </View>
      <View className="flex-row justify-center mb-4">
        <View className="flex-row items-center mr-4">
          <View className="w-4 h-4 bg-[#44945F] mr-2" />
          <Text>Transportation</Text>
        </View>
        <View className="flex-row items-center mr-4">
          <View className="w-4 h-4 bg-[#AEDCA7] mr-2" />
          <Text>Diet</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-[#66A570] mr-2" />
          <Text>Energy</Text>
        </View>
      </View>
    </View>
  );
};

export default PieChartBreakdown;
