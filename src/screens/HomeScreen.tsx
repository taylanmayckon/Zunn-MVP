import { View } from "react-native";
import { useState } from "react";

import Header from "@/components/Header";
import Map from "@/components/Map";
import BottomSheet from "@/components/BottomSheet";

import type { Scooter } from "@/types";


export default function HomeScreen() {

  const [selectedScooter, setSelectedScooter] =
    useState<Scooter | null>(null);


  return (
    <View style={{ flex: 1 }}>

      <Map
        onSelectScooter={setSelectedScooter}
        selectedScooter={selectedScooter}
      />


      <Header />


      <BottomSheet
        scooter={selectedScooter}
      />

    </View>
  );
}