import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#aaa"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#FFD600",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 12,
  },
});

export default Input;