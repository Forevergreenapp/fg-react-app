import React from "react";
import { View, Text } from "react-native";
import { Svg, Rect, Line, Text as SvgText } from "react-native-svg";

const BarChart = ({
  value1,
  value2,
  label1,
  label2,
  maxValue
}: {
  value1: number;
  value2: number;
  label1: string;
  label2: string;
  maxValue: number;
}) => {
  const chartHeight = 200;
  const chartWidth = 300;
  const barWidth = 80;
  const spacing = 40;

  const getBarHeight = (value: number) => (value / maxValue) * chartHeight;

  let scaleValues = [];
  let i = 0;
  while (i <= maxValue) {
    scaleValues.push(i);
    if (maxValue > 80) {
      i += 20;
    } else if (maxValue > 40) {
      i += 10;
    } else {
      i += 5;
    }
  }
  return (
    <View className="">
      {/* Legend */}
      <View className="flex-row mb-4">
        <View className="flex-row items-center mr-8">
          <View className="w-12 h-4 bg-[#44945F] mr-2" />
          <Text className="text-md">{label1}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-12 h-4 bg-[#A9A9A9] mr-2" />
          <Text className="text-md">{label2}</Text>
        </View>
      </View>

      <Svg height={chartHeight + 30} width={chartWidth}>
        {/* Y-axis */}
        <Line
          x1="40"
          y1="0"
          x2="40"
          y2={chartHeight}
          stroke="#000"
          strokeWidth="1"
        />

        {/* X-axis */}
        <Line
          x1="40"
          y1={chartHeight}
          x2={chartWidth}
          y2={chartHeight}
          stroke="#000"
          strokeWidth="1"
        />

        {/* Scale and grid lines */}
        {scaleValues.map((tick, index) => (
          <React.Fragment key={index}>
            <Line
              x1="35"
              y1={chartHeight - (tick / maxValue) * chartHeight}
              x2={chartWidth}
              y2={chartHeight - (tick / maxValue) * chartHeight}
              stroke="#000"
              strokeWidth="1"
            />
            <SvgText
              x="10"
              y={chartHeight - (tick / maxValue) * chartHeight + 5}
              fontSize="12"
              fill="#000"
              textAnchor="start"
            >
              {tick}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Bars */}
        <Rect
          x={spacing + 40}
          y={chartHeight - getBarHeight(value1)}
          width={barWidth}
          height={getBarHeight(value1)}
          fill="#44945F"
        />
        <Rect
          x={spacing * 2 + barWidth + 40}
          y={chartHeight - getBarHeight(value2)}
          width={barWidth}
          height={getBarHeight(value2)}
          fill="#A9A9A9"
        />
      </Svg>
    </View>
  );
};

export default BarChart;
