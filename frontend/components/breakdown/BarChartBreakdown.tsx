import React from "react";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

type BarChartProps = {
  names: string[];
  values: number[];
  colors: string[];
};

const BarChartBreakdown = ({ names, values, colors }: BarChartProps) => {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: names,
    datasets: [
      {
        data: values,
        colors: values.map((value, index) => () => colors[index]),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(68, 148, 95, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 2,
  };

  return (
    <View className="shadow-lg rounded-xl bg-white px-4 mb-4">
      <Text className="text-2xl font-bold mb-4">
        You vs the Average American
      </Text>
      <View className="flex-row items-center justify-center mb-4">
        <View className="flex-row items-center mr-4">
          <View className="w-4 h-4 mr-2 bg-[#44945F]" />
          <Text>You</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 mr-2 bg-[#A9A9A9]" />
          <Text>Average American</Text>
        </View>
      </View>
      <View className="mx-auto mb-5"></View>
      <View className="flex-1 items-center justify-center">
        <BarChart
          data={data}
          width={screenWidth - 96}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showBarTops={false}
          yAxisLabel=""
          yAxisSuffix=""
          withCustomBarColorFromData={true}
          flatColor={true}
        />
      </View>
    </View>
  );
};

export default BarChartBreakdown;
