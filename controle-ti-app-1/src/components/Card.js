import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ title, quantity, category }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>Qtd: {quantity}</Text>
      <Text style={styles.cat}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD600",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    color: "#ddd",
  },
  cat: {
    color: "#FFD600",
    fontSize: 12,
  },
});

export default Card;