import { View, Text, Pressable } from "react-native";
import { X } from "lucide-react-native";
import { router } from "expo-router";

import styles from "./styles";


export default function ScannerScreen() {

  return (

    <View style={styles.container}>


      {/* Botão voltar */}
      <Pressable
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <X color="white" size={24}/>
      </Pressable>



      <Text style={styles.title}>
        Escaneie o QR Code
      </Text>



      {/* Área da câmera */}
      <View style={styles.qrBox}>


        <View style={styles.cornerTopLeft}/>
        <View style={styles.cornerTopRight}/>
        <View style={styles.cornerBottomLeft}/>
        <View style={styles.cornerBottomRight}/>


        <View style={styles.scanLine}/>


      </View>



      <Text style={styles.subtitle}>
        O código fica no guidão do patinete
      </Text>



      <Pressable
        style={styles.button}
        onPress={() => router.push("/ride")}
      >

        <Text style={styles.buttonText}>
          Simular Desbloqueio
        </Text>

      </Pressable>


    </View>

  );
}