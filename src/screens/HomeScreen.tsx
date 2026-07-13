import { View } from "react-native";
import { useState, useEffect } from "react";
// 1. Adicione o router aqui na importação:
import { useLocalSearchParams, router } from "expo-router";

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

  useEffect(() => {
    if (params.startRide === "true") {
      setRideActive(true);
    }
  }, [params]);

  return (
    <View style={{ flex: 1 }}>
      <Map
        onSelectScooter={setSelectedScooter}
        selectedScooter={selectedScooter}
      />

      {!drawerOpen && (
        <Header
          onMenuPress={() => {
            setDrawerOpen(true);
          }}
        />
      )}

      {rideActive ? (
        <RidePanel
          onFinish={() => {
            // Desativa a interface da corrida e tira a seleção
            setRideActive(false);
            setSelectedScooter(null);
            
            // 2. Limpa o parâmetro "startRide" da rota para não entrar no loop!
            router.setParams({ startRide: "" });
          }}
        />
      ) : (
        <BottomSheet
          scooter={selectedScooter}
          onCancel={() => {
            setSelectedScooter(null);
          }}
        />
      )}

      <DrawerMenu
        visible={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
    </View>
  );
}