import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EstoqueScreen({ navigation }) {
  const [estoque, setEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarEstoque = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Login");
        return;
      }
      const response = await axios.get("http://192.168.24.5:8000/estoque", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Itens carregados:", response.data);
      setEstoque(response.data);
    } catch (error) {
      console.log("Erro ao carregar estoque:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigation]);

  useEffect(() => {
    carregarEstoque();
  }, [carregarEstoque]);

  const onRefresh = () => {
    setRefreshing(true);
    carregarEstoque();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD600" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estoque</Text>
      <FlatList
        data={estoque}
        keyExtractor={(item, index) => item?.id_item?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nome_item}</Text>
            <Text style={styles.text}>Qtd: {item.quantidade}</Text>
            <Text style={styles.cat}>{item.categoria}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  cat: {
    color: "#FFD600",
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});