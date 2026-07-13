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
  // Nova propriedade para engatilhar o foco no usuário
  centerTrigger?: number; 
};

export default function Map({
  onSelectScooter,
  selectedScooter,
  centerTrigger = 0,
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

  // Novo useEffect escutando o botão de localização da Home
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