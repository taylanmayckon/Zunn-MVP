import { useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";

import { scooters } from "@/data/scooters";
import { stations } from "@/data/stations";
import styles from "./styles";
import type { Scooter } from "@/types";

type Props = {
  onSelectScooter?: (scooter: Scooter) => void;
  selectedScooter?: Scooter | null;
  centerTrigger?: number; 
  rideActive?: boolean;
};

export default function Map({
  onSelectScooter,
  selectedScooter,
  centerTrigger = 0,
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

  // Mantemos o useEffect para atualizações de estado quando o componente já está vivo
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
        source={require("./leaflet.html")}
        injectedJavaScript={`
          window.stations = ${JSON.stringify(stations)};
          window.allScooters = ${JSON.stringify(scooters)};
          window.scooters = ${JSON.stringify(
            scooters.filter(scooter => scooter.location === "Em utilização")
          )};
          window.selectedScooter = ${JSON.stringify(selectedId)};
          window.renderStations();
          window.renderMovingScooters();
          
          /* CORREÇÃO AQUI: Força o mapa a verificar se deve desenhar a rota assim que nascer */
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