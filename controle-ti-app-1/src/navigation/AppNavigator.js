import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import EstoqueScreen from "../screens/EstoqueScreen";
import MovimentacoesScreen from "../screens/MovimentacoesScreen";
import EntradaScreen from "../screens/EntradaScreen";
import SaidaScreen from "../screens/SaidaScreen";
import TrocaScreen from "../screens/TrocaScreen";
import HistoricoScreen from "../screens/HistoricoScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFD600",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Estoque"
          component={EstoqueScreen}
          options={{ title: "📦 Estoque" }}
        />
        <Stack.Screen
          name="Movimentacoes"
          component={MovimentacoesScreen}
          options={{ title: "🔄 Movimentações" }}
        />
        <Stack.Screen
          name="EntradaScreen"
          component={EntradaScreen}
          options={{ title: "📦 Entrada" }}
        />
        <Stack.Screen
          name="SaidaScreen"
          component={SaidaScreen}
          options={{ title: "📤 Saída" }}
        />
        <Stack.Screen
          name="TrocaScreen"
          component={TrocaScreen}
          options={{ title: "🔄 Troca" }}
        />
        <Stack.Screen
          name="Historico"
          component={HistoricoScreen}
          options={{ title: "📋 Histórico" }}
        />
      </Stack.Navigator>
  );
}