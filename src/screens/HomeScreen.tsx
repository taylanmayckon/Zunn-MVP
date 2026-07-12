import { View } from "react-native";
import { useState } from "react";

import Header from "@/components/Header";
import Map from "@/components/Map";
import BottomSheet from "@/components/BottomSheet";
import DrawerMenu from "@/components/DrawerMenu";

import type { Scooter } from "@/types";


export default function HomeScreen() {

  const [selectedScooter, setSelectedScooter] =
    useState<Scooter | null>(null);

  const [drawerOpen,setDrawerOpen] = useState(false);


  return (
    <View style={{ flex: 1 }}>

      <Map
        onSelectScooter={setSelectedScooter}
        selectedScooter={selectedScooter}
      />


      {!drawerOpen && (
        <Header 
          onMenuPress={()=>{
            setDrawerOpen(true);
          }}
        />
      )}


      <BottomSheet
        scooter={selectedScooter}
      />

      <DrawerMenu
        visible={drawerOpen}
        onClose={()=>{
            setDrawerOpen(false);
        }}
      />

    </View>
  );
}