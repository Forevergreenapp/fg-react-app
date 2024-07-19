import React, { useRef } from "react";
import { Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const NumberInput = ({
  question,
  value,
  onChange,
  unit,
  label,
  error,
}: {
  question: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  label?: string;
  error?: string;
}) => {
  const inputRef = useRef<any>(null);

  return (
    <>
      <Text className="mt-6 text-xl">{question}</Text>
      <TextInput
        ref={inputRef}
        placeholder="Your Answer"
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{
          borderWidth: 0,
        }}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1.41,
          borderRadius: 8,
          marginTop: 16,
        }}
        right={label ? <TextInput.Affix text={label} /> : null}
        left={unit ? <TextInput.Affix text={unit} /> : null}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};

export default NumberInput;
