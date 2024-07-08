import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Circle, Text } from "react-native-svg";

const PieChart = ({
  widthAndHeight,
  series,
  sliceColor,
  coverRadius,
}: {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  coverRadius: number;
}) => {
  const total = series.reduce((sum, value) => sum + value, 0);
  let startAngle = 0;
  const strokeWidth = 1;
  const radius = 48;
  const textRadius = radius - 12;;

  return (
    <View style={{ width: widthAndHeight, height: widthAndHeight }}>
      <Svg
        width={widthAndHeight}
        height={widthAndHeight}
        viewBox="-3 -3 106 106"
      >
        <G transform="translate(50 50) rotate(90) scale(-1 1)">
          {series.map((value, index) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;
            const endAngle = startAngle + angle;

            const x1 = Math.cos((startAngle * Math.PI) / 180) * radius;
            const y1 = Math.sin((startAngle * Math.PI) / 180) * radius;
            const x2 = Math.cos((endAngle * Math.PI) / 180) * radius;
            const y2 = Math.sin((endAngle * Math.PI) / 180) * radius;

            const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L 0 0`;

            // Calculate position for the percentage text
            const midAngle = startAngle + angle / 2;
            const textX = Math.cos((midAngle * Math.PI) / 180) * textRadius;
            const textY = Math.sin((midAngle * Math.PI) / 180) * textRadius;

            startAngle += angle;

            const displayPercentage = percentage < 1 ? '<1%' : `${Math.round(percentage)}%`;

            return (
              <G key={index}>
                <Path
                  d={pathData}
                  fill={sliceColor[index]}
                  stroke="black"
                  strokeWidth={strokeWidth}
                />
                <G
                  transform={`translate(${textX}, ${textY}) rotate(90) scale(-1, 1)`}
                >
                  <Text
                    fill="black"
                    fontSize="8"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {displayPercentage}
                  </Text>
                </G>
              </G>
            );
          })}
        </G>
        <Circle
          cx="50"
          cy="50"
          r={coverRadius * 50}
          fill="#FFF"
          stroke="black"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default PieChart;
