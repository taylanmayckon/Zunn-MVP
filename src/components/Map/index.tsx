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

  const selectedId = selectedScooter?.id ?? null;

  return (
    <View style={styles.container}>
      <WebView
        key={selectedId ?? "none"}
        style={styles.map}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        source={require("./leaflet.html")}

        injectedJavaScript={`
          window.stations = ${JSON.stringify(stations)};
          window.allScooters = ${JSON.stringify(scooters)};
          window.scooters = ${JSON.stringify(
            scooters.filter(scooter => scooter.status === "in_use")
          )};
          window.selectedScooter = ${JSON.stringify(selectedId)};
          
          window.renderStations();
          window.renderMovingScooters();
          true;
        `}

        onMessage={(event) => {
          try {
            // 解析 o dado recebido
            const data = JSON.parse(event.nativeEvent.data);
            
            // Verifica se o tipo é "scooter" e passa apenas o objeto do patinete interno
            if (data && data.type === "scooter") {
              onSelectScooter?.(data.scooter);
            }
          } catch (error) {
            console.error("Erro ao processar mensagem do mapa:", error);
          }
        }}
      />
    </View>
  );
}