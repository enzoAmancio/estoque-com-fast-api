import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD600",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;