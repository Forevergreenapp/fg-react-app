import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { RadioButton, TextInput, HelperText } from "react-native-paper";

const TransportQuestion = ({
  question,
  useTransport,
  setUseTransport,
  frequency,
  setFrequency,
  frequencyError,
  label,
  validateNumber,
}: any) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (useTransport === "No") {
      setFrequency("0");
    }
  }, [useTransport, setFrequency]);
  useEffect(() => {
    if (useTransport === "Yes") {
      setFrequency("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useTransport]);

  return (
    <>
      <Text className="mt-8 text-xl">{question}</Text>
      <View className="flex-row items-top justify-between mt-6">
        <View className="-ml-2 w-1/2">
          {["Yes", "No"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setUseTransport(option)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <RadioButton
                  value={option}
                  status={useTransport === option ? "checked" : "unchecked"}
                  onPress={() => setUseTransport(option)}
                  color="#44945F"
                />
                <Text className="text-lg">{option}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {useTransport === "Yes" && (
          <View className="w-1/2">
            <Text className="text-sm">How many times a week?</Text>
            <View className="mt-2 bg-white border border-[#D9D9D9] rounded-lg overflow-hidden flex-row items-center">
              <TextInput
                ref={inputRef}
                value={frequency}
                onChangeText={(value) => validateNumber(value, setFrequency)}
                keyboardType="numeric"
                mode="outlined"
                outlineStyle={{ borderColor: "transparent" }}
                dense={true}
                style={{
                  height: 40,
                  backgroundColor: "#FFF",
                  width: "auto",
                }}
              />
              <Pressable
                onPress={() => inputRef.current?.focus()}
                style={{
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  right: 5,
                }}
              >
                <Text className="text-sm">{label}</Text>
              </Pressable>
            </View>
            <HelperText type="error" visible={!!frequencyError}>
              {frequencyError}
            </HelperText>
          </View>
        )}
      </View>
    </>
  );
};

export default TransportQuestion;
