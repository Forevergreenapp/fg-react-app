import React, { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const NumberInput = ({ question, value, onChange, label, error }: any) => {
  const inputRef = useRef<any>(null);
  
  return (
    <>
      <Text className="mt-6 text-xl">{question}</Text>
      <View className="mt-4 bg-white shadow-md shadow-black rounded-lg flex-row items-center">
        <TextInput
          ref={inputRef}
          placeholder="Your Answer"
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          mode="outlined"
          outlineStyle={{ borderColor: "transparent" }}
          className="p-4"
          style={{
            backgroundColor: "",
            width: "100%",
          }}
        />
        {value && (
          <Pressable
            className="absolute left-16"
            onPress={() => inputRef.current?.focus()}
          >
            <Text>{label}</Text>
          </Pressable>
        )}
      </View>
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};

export default NumberInput;
