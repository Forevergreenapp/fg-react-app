import React, { useRef } from "react";
import { Text, Pressable } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const NumberInput = ({
  question,
  value,
  onChange,
  unit,
  label,
  error,
}: any) => {
  const inputRef = useRef<any>(null);

  return (
    <>
      <Text className="mt-6 text-xl">{question}</Text>
      <Pressable
        className="mt-4 bg-white shadow-md shadow-black rounded-lg flex-row items-center"
        onPress={() => inputRef.current?.focus()}
      >
        {value && (
          <Pressable
            style={{ position: "absolute", left: 5 }}
            onPress={() => inputRef.current?.focus()}
          >
            <Text>{unit}</Text>
          </Pressable>
        )}
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
            style={{ position: "absolute", left: 70 }}
            onPress={() => inputRef.current?.focus()}
          >
            <Text>{label}</Text>
          </Pressable>
        )}
      </Pressable>
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};

export default NumberInput;
