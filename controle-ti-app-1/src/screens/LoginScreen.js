import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { colors, spacing, borderRadius, shadows } from "../utils/theme";

const API_URL = "http://192.168.24.5:8000";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(`${API_URL}/login`, formData.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = response.data;
      console.log("Token recebido:", access_token);

      await AsyncStorage.setItem("token", access_token);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home", params: { userName: username } }],
      });
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>VERTICAL</Text>
        <Text style={styles.subtitle}>Controle de Estoque</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário"
            placeholderTextColor={colors.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.primary,
    letterSpacing: 4,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    letterSpacing: 2,
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    marginTop: spacing.lg,
    ...shadows.button,
  },
  loginButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
