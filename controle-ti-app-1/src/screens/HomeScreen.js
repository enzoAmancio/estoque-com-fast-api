import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing, borderRadius, shadows } from "../utils/theme";

export default function HomeScreen({ route, navigation }) {
  const userName = route?.params?.userName || "Usuário";

  const handleLogout = async () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {userName}</Text>
        <Text style={styles.subtitle}>VERTICAL - Controle de Estoque</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuCard, styles.cardPrimary]}
          onPress={() => navigation.navigate("Estoque")}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.cardIcon}>📦</Text>
          </View>
          <Text style={styles.cardTitle}>Estoque</Text>
          <Text style={styles.cardSubtitle}>Visualizar itens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuCard, styles.cardSecondary]}
          onPress={() => navigation.navigate("Movimentacoes")}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.cardIcon}>🔄</Text>
          </View>
          <Text style={styles.cardTitle}>Movimentações</Text>
          <Text style={styles.cardSubtitle}>Entrada/Saída/Troca</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuCard, styles.cardSecondary]}
          onPress={() => navigation.navigate("Historico")}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.cardIcon}>📋</Text>
          </View>
          <Text style={styles.cardTitle}>Histórico</Text>
          <Text style={styles.cardSubtitle}>Ver movimentações</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: "600",
  },
  menuContainer: {
    flex: 1,
    gap: spacing.md,
  },
  menuCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  cardPrimary: {
    backgroundColor: colors.primary,
  },
  cardSecondary: {
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  cardIcon: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  logoutButton: {
    backgroundColor: colors.backgroundCard,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
});
