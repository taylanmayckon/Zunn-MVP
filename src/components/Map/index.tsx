import { useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";

import { scooters } from "@/data/scooters";
import { stations } from "@/data/stations";
import styles from "./styles";
import type { Scooter } from "@/types";

// IMPORTANTE: Importamos o HTML em forma de código
import { leafletHtml } from "./leafletHtml";

type Props = {
  onSelectScooter?: (scooter: Scooter) => void;
  selectedScooter?: Scooter | null;
  centerTrigger?: number; 
  isRoutePlanned?: boolean;
  rideActive?: boolean;
};

export default function Map({
  onSelectScooter,
  selectedScooter,
  centerTrigger = 0,
  isRoutePlanned = false,
  rideActive = false,
}: Props) {
  const webViewRef = useRef<WebView>(null);
  const selectedId = selectedScooter?.id ?? null;

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (typeof window.updateSelectedScooter === 'function') {
          window.updateSelectedScooter(${selectedId ? `"${selectedId}"` : "null"});
        }
        true;
      `);
    }
  }, [selectedId]);

  useEffect(() => {
    if (centerTrigger > 0 && webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (typeof window.centerOnUser === 'function') {
          window.centerOnUser();
        }
        true;
      `);
    }
  }, [centerTrigger]);

  useEffect(() => {
    if (webViewRef.current && isRoutePlanned !== undefined) {
      webViewRef.current.injectJavaScript(`
        if (typeof window.togglePlannedRoute === 'function') {
          window.togglePlannedRoute(${isRoutePlanned});
        }
        true;
      `);
    }
  }, [isRoutePlanned]);

  useEffect(() => {
    if (webViewRef.current && rideActive !== undefined) {
      webViewRef.current.injectJavaScript(`
        if (typeof window.toggleRideRoute === 'function') {
          window.toggleRideRoute(${rideActive});
        }
        true;
      `);
    }
  }, [rideActive]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.map}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        // AQUI ESTÁ A MÁGICA: Injetando o HTML diretamente da variável
        source={{ html: leafletHtml }}
        injectedJavaScript={`
          window.stations = ${JSON.stringify(stations)};
          window.allScooters = ${JSON.stringify(scooters)};
          window.scooters = ${JSON.stringify(
            scooters.filter(scooter => scooter.location === "Em utilização")
          )};
          window.selectedScooter = ${JSON.stringify(selectedId)};
          window.renderStations();
          window.renderMovingScooters();
          
          if (typeof window.togglePlannedRoute === 'function') {
            window.togglePlannedRoute(${isRoutePlanned});
          }

          if (typeof window.toggleRideRoute === 'function') {
            window.toggleRideRoute(${rideActive});
          }
          
          true;
        `}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data && data.type === "scooter") {
              onSelectScooter?.(data.scooter);
            }
          } catch (error) {
            console.error("Erro ao ler mensagem do mapa:", error);
          }
        }}
      />
    </View>
  );
}