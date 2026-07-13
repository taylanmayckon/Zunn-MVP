import { View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";

import { LocateFixed } from "lucide-react-native";

import Header from "@/components/Header";
import Map from "@/components/Map";
import BottomSheet from "@/components/BottomSheet";
import DrawerMenu from "@/components/DrawerMenu";
import RidePanel from "@/components/RidePanel";

import type { Scooter } from "@/types";

export default function HomeScreen() {
  const params = useLocalSearchParams();

  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rideActive, setRideActive] = useState(false);
  
  // NOVO: Estado que controla o planejamento opcional de viagem
  const [isRoutePlanned, setIsRoutePlanned] = useState(false);
  
  const [centerMapTrigger, setCenterMapTrigger] = useState(0);

  useEffect(() => {
    if (params.startRide === "true") {
      setRideActive(true);
      setIsRoutePlanned(false); // Desliga a rota de planejamento quando a corrida real começa
    }
  }, [params]);

  const getFabBottomPosition = () => {
    if (rideActive) return 360; 
    if (selectedScooter) return 460; // Ajuste leve para o novo botão do bottomsheet
    return 240; 
  };

  return (
    <View style={{ flex: 1 }}>
      <Map
        onSelectScooter={(scooter) => {
            setSelectedScooter(scooter);
            setIsRoutePlanned(false); // Reseta a rota ao clicar em outro patinete
        }}
        selectedScooter={selectedScooter}
        centerTrigger={centerMapTrigger}
        isRoutePlanned={isRoutePlanned} // <- Envia para o mapa desenhar
        rideActive={rideActive}
      />

      {!drawerOpen && (
        <Header onMenuPress={() => setDrawerOpen(true)} />
      )}

      {!drawerOpen && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setCenterMapTrigger(prev => prev + 1)}
          style={{
            position: "absolute",
            right: 20,
            bottom: getFabBottomPosition(),
            backgroundColor: "#18181B",
            width: 52,
            height: 52,
            borderRadius: 26,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#3F3F46",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 5,
            elevation: 6,
            zIndex: 10,
          }}
        >
          <LocateFixed color="#A3E635" size={24} />
        </TouchableOpacity>
      )}

      {rideActive ? (
        <RidePanel
          onFinish={() => {
            setRideActive(false);
            setSelectedScooter(null);
            router.setParams({ startRide: "" });
          }}
        />
      ) : (
        <BottomSheet
          scooter={selectedScooter}
          isRoutePlanned={isRoutePlanned}
          onPlanRoute={() => setIsRoutePlanned(true)}
          onCancel={() => {
            setSelectedScooter(null);
            setIsRoutePlanned(false); // Desfaz o planejamento se cancelar
          }}
        />
      )}

      <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
}