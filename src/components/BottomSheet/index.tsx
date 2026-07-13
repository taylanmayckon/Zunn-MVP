import { View, Text, Animated, TouchableOpacity } from "react-native";
import { useEffect, useRef } from "react";
import { Bell } from "lucide-react-native"; // Importando o ícone do sino
import { router } from "expo-router";

import styles from "./styles";
import AppButton from "@/components/AppButton";
import type { Scooter } from "@/types";

type Props = {
  scooter: Scooter | null;
  onCancel: () => void;
};

export default function BottomSheet({ scooter, onCancel }: Props) {
  const height = useRef(new Animated.Value(220)).current;

  useEffect(() => {
    Animated.spring(height, {
      toValue: scooter ? 380 : 220, // Aumentei levemente para 380 para acomodar os novos itens
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [scooter]);

  // Cálculo de autonomia (ex: 100% de bateria = 25km)
  const estimatedRange = scooter ? Math.floor((scooter.battery / 100) * 25) : 0;

  return (
    <Animated.View style={[styles.container, { height }]}>
      <View style={styles.handle} />

      {!scooter ? (
        <>
          <Text style={styles.title}>Encontre um Zunn</Text>
          <Text style={styles.subtitle}>
            Selecione um patinete no mapa ou escaneie um QR Code.
          </Text>
          <AppButton
            title="Escanear QR Code"
            onPress={() => router.push("/scanner")}
          />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{scooter.id}</Text>
              <Text style={styles.subtitle}>{scooter.location}</Text>
            </View>
            
            {/* Bloco de Bateria e Autonomia */}
            <View style={styles.batteryBlock}>
              <View style={styles.battery}>
                <Text style={styles.batteryText}>{scooter.battery}%</Text>
              </View>
              <Text style={styles.rangeText}>Alcance ~{estimatedRange} km</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Desbloqueio</Text>
              <Text style={styles.infoValue}>R$ 2,00</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Por minuto</Text>
              <Text style={styles.infoValue}>R$ 0,60</Text>
            </View>
          </View>

          <AppButton
            title="Escanear para Desbloquear"
            onPress={() => router.push("/scanner")}
          />

          {/* Botões Secundários: Cancelar e Tocar Alarme */}
          <View style={styles.secondaryActions}>
            <View style={{ flex: 1 }}>
              <AppButton title="Cancelar" variant="ghost" onPress={onCancel} />
            </View>
            
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Bell size={20} color="#A1A1AA" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Animated.View>
  );
}