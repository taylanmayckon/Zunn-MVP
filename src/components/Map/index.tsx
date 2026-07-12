import MapView, { Marker } from "react-native-maps";

import styles from "./styles";

export default function Map() {
  return (
    <MapView
      provider="google"
      style={styles.map}
      initialRegion={{
        latitude: -9.4121,
        longitude: -40.4984,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      <Marker
        coordinate={{
          latitude: -9.4121,
          longitude: -40.4984,
        }}
      />
    </MapView>
  );
}