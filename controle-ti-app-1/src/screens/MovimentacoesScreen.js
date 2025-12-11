import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MovimentacoesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔄 Movimentações</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EntradaScreen")}
      >
        <Text style={styles.buttonIcon}>📦</Text>
        <Text style={styles.buttonText}>Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SaidaScreen")}
      >
        <Text style={styles.buttonIcon}>📤</Text>
        <Text style={styles.buttonText}>Saída</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TrocaScreen")}
      >
        <Text style={styles.buttonIcon}>🔄</Text>
        <Text style={styles.buttonText}>Troca</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    justifyContent: "center",
  },
  header: {
    color: "#FFD600",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD600",
  },
  buttonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  buttonText: {
    color: "#FFD600",
    fontSize: 20,
    fontWeight: "bold",
  },
});