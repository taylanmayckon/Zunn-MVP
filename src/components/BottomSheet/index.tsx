import { View, Text } from "react-native";

import styles from "./styles";

import AppButton from "@/components/AppButton";

import { Colors } from "@/constants";

import type { Scooter } from "@/types";

type Props = {
  scooter: Scooter | null;
};

export default function BottomSheet({ scooter }: Props) {
  // Nenhum patinete selecionado
  if (!scooter) {
    return (
      <View style={styles.container}>
        <View style={styles.handle} />

        <Text style={styles.title}>
          Encontre um Zunn
        </Text>

        <Text style={styles.subtitle}>
          Selecione um patinete no mapa ou escaneie um QR Code.
        </Text>

        <AppButton
          title="Escanear QR Code"
          onPress={() => {}}
        />
      </View>
    );
  }

  // Patinete selecionado
  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <Text style={styles.title}>
        {scooter.id}
      </Text>

      <Text style={styles.subtitle}>
        {scooter.location}
      </Text>

      <Text
        style={{
          color: Colors.primary,
          fontWeight: "700",
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        🔋 {scooter.battery}%
      </Text>

      <AppButton
        title="Escanear para Desbloquear"
        onPress={() => {}}
      />
    </View>
  );
}