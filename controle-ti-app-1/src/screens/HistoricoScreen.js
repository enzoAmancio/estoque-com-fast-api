import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarHistorico() {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://192.168.24.5:8000/estoque/movimentacoes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistorico(response.data);
    } catch (error) {
      console.log("Erro ao carregar histórico", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD600" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Movimentações</Text>
      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.data}</Text>
            <Text style={styles.text}>Item: {item.item}</Text>
            <Text style={styles.text}>Tipo: {item.tipo}</Text>
            <Text style={styles.text}>Setores: {item.setores?.join(", ") || "N/A"}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    color: "#FFD600",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});