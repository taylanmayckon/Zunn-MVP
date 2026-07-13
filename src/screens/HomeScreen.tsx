import { View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";

// Importe o ícone LocateFixed
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
  
  // Estado que funciona como um "gatilho" para focar a câmera no GPS
  const [centerMapTrigger, setCenterMapTrigger] = useState(0);

  useEffect(() => {
    if (params.startRide === "true") {
      setRideActive(true);
    }
  }, [params]);

  // Cálculo dinâmico para o botão Flutuante (FAB) não ficar escondido
  const getFabBottomPosition = () => {
    if (rideActive) return 360; 
    if (selectedScooter) return 380; // Acima do bottomsheet expandido
    return 240; // Acima do bottomsheet minimizado
  };

  return (
    <View style={{ flex: 1 }}>
      <Map
        onSelectScooter={setSelectedScooter}
        selectedScooter={selectedScooter}
        centerTrigger={centerMapTrigger}
        rideActive={rideActive}
      />

      {!drawerOpen && (
        <Header
          onMenuPress={() => {
            setDrawerOpen(true);
          }}
        />
      )}

      {/* BOTÃO FLUTUANTE DE LOCALIZAÇÃO (FAB) */}
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