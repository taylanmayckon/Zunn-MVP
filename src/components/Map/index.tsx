import { WebView } from "react-native-webview";
import { View } from "react-native";

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
          
          window.scooters = ${JSON.stringify([
            {
              id: "ZN-104",
              latitude: -9.4150,
              longitude: -40.5010,
              battery: 85,
              location: "Orla de Juazeiro",
            },
            {
              id: "ZN-299",
              latitude: -9.4120,
              longitude: -40.4980,
              battery: 42,
              location: "Ponte Presidente Dutra",
            },
            {
              id: "ZN-801",
              latitude: -9.4080,
              longitude: -40.4960,
              battery: 98,
              location: "Orla de Petrolina",
            },
          ])};


          window.selectedScooter =
          ${JSON.stringify(selectedId)};


          window.renderScooters();


          true;
        `}


        onMessage={(event)=>{

          const scooter =
            JSON.parse(
              event.nativeEvent.data
            );


          onSelectScooter?.(scooter);

        }}

      />

    </View>
  );
}