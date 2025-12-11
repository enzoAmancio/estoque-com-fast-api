import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function EntradaScreen({ navigation }) {
    const [itemId, setItemId] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [setor, setSetor] = useState("");
    const [itens, setItens] = useState([]);

    useEffect(() => {
        carregarItens();
    }, []);

    async function carregarItens() {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get("http://192.168.24.5:8000/estoque", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Itens carregados:", response.data);
            setItens(response.data);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os itens");
        }
    }

    async function handleEntrada() {
        if (!itemId || itemId === "" || !quantidade || !setor) {
            Alert.alert("Atenção", "Preencha todos os campos");
            console.log("Validação:", { itemId, quantidade, setor });
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");
            await axios.post(
                "http://192.168.24.5:8000/estoque/entrada",
                {
                    id_item: parseInt(itemId),
                    tipo: "entrada",
                    setor_destino: setor,
                    descricao: null,
                    quantidade: parseInt(quantidade)
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Alert.alert("Sucesso", "Entrada registrada com sucesso!");
            setItemId("");
            setQuantidade("");
            setSetor("");
        } catch (error) {
            console.log("Erro:", error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível registrar a entrada");
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>📦 Registrar Entrada</Text>

            <Text style={styles.label}>Item:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={itemId}
                    onValueChange={(value) => setItemId(value)}
                    style={styles.picker}
                    dropdownIconColor="#FFD600"
                >
                    <Picker.Item label="Selecione um item" value="" />
                    {itens.map((item, index) => (
                        <Picker.Item
                            key={item?.id_item?.toString() || index.toString()}
                            label={item.nome_item}
                            value={item?.id_item?.toString() || ""}
                        />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Quantidade:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 10"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
            />

            <Text style={styles.label}>Setor:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: TI, Estoque, Almoxarifado"
                placeholderTextColor="#666"
                value={setor}
                onChangeText={setSetor}
            />

            <TouchableOpacity style={styles.button} onPress={handleEntrada}>
                <Text style={styles.buttonText}>✔ Confirmar Entrada</Text>
            </TouchableOpacity>
        </ScrollView>
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
        marginBottom: 20,
    },
    label: {
        color: "#FFD600",
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#111",
        color: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#333",
    },
    pickerContainer: {
        backgroundColor: "#111",
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#333",
    },
    picker: {
        color: "#fff",
    },
    button: {
        backgroundColor: "#FFD600",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
});
