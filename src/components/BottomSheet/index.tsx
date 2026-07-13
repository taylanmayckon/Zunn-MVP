import { View, Text, Animated, TouchableOpacity } from "react-native";
import { useEffect, useRef } from "react";
import { Bell, Zap, Route } from "lucide-react-native"; 
import { router } from "expo-router";

import styles from "./styles";
import AppButton from "@/components/AppButton";
import type { Scooter } from "@/types";

type Props = {
  scooter: Scooter | null;
  isRoutePlanned?: boolean;
  onPlanRoute?: () => void;
  onCancel: () => void;
};

export default function BottomSheet({ scooter, isRoutePlanned, onPlanRoute, onCancel }: Props) {
  const height = useRef(new Animated.Value(220)).current;

  useEffect(() => {
    // Agora o BottomSheet tem uma altura fixa bem definida quando expandido
    Animated.spring(height, {
      toValue: scooter ? 430 : 220, 
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [scooter]);

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
          {/* CABEÇALHO LIMPO: ID, Localização, Bateria e Sino */}
          <View style={styles.header}>
            <View>
              <Text style={styles.scooterId}>{scooter.id}</Text>
              <Text style={styles.scooterLocation}>{scooter.location}</Text>
            </View>
            
            <View style={styles.headerActions}>
              <View style={styles.batteryBadge}>
                <Zap size={14} color="#09090b" fill="#09090b" />
                <Text style={styles.batteryText}>{scooter.battery}%</Text>
              </View>
              <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
                <Bell size={20} color="#A1A1AA" />
              </TouchableOpacity>
            </View>
          </View>

          {/* GRID DE INFORMAÇÕES HORIZONTAL (Estilo Uber) */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Autonomia</Text>
              <Text style={styles.statValue}>~{estimatedRange} km</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Tarifa</Text>
              <Text style={styles.statValue}>R$ 2,00</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Minuto</Text>
              <Text style={styles.statValue}>R$ 0,60</Text>
            </View>
          </View>

          {/* OPÇÃO DE PLANEJAMENTO DE ROTA */}
          {isRoutePlanned ? (
            <View style={styles.plannedRouteBox}>
               <View style={{flex: 1}}>
                 <Text style={styles.plannedRouteTitle}>Destino: Parque Municipal</Text>
                 <Text style={styles.plannedRouteSubtitle}>Chegada em ~14 min</Text>
               </View>
               <View style={{alignItems: 'flex-end'}}>
                 <Text style={styles.infoLabel}>Custo Est.</Text>
                 <Text style={styles.plannedRoutePrice}>R$ 10,40</Text>
               </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.planRouteButton} onPress={onPlanRoute} activeOpacity={0.7}>
              <Route size={18} color="#A1A1AA" />
              <Text style={styles.planRouteText}>Adicionar Destino (Opcional)</Text>
            </TouchableOpacity>
          )}

          {/* AÇÕES PRINCIPAIS */}
          <View style={styles.mainActions}>
            <AppButton
              title="Escanear para Desbloquear"
              onPress={() => router.push("/scanner")}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
              <Text style={styles.cancelText}>Cancelar seleção</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Animated.View>
  );
}