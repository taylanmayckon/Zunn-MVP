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
};

export default function Map({
  onSelectScooter,
  selectedScooter,
}: Props) {
  // Referência para controlar a WebView silenciosamente
  const webViewRef = useRef<WebView>(null);
  const selectedId = selectedScooter?.id ?? null;

  // Atualiza o Leaflet sempre que um patinete é selecionado (sem dar reload na página)
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

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        // A propriedade "key" FOI REMOVIDA para impedir o piscar em branco!
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
            
            // CORREÇÃO: Pega apenas o objeto do patinete de dentro do envelope!
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