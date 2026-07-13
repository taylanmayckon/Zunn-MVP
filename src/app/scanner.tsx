import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { X, Flashlight, Keyboard } from "lucide-react-native";

import AppButton from "@/components/AppButton";
import { Colors } from "@/constants";

export default function ScannerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: Botão de fechar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <X color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* ÁREA CENTRAL: Mira do Scanner Mockada */}
      <View style={styles.scannerArea}>
        <View style={styles.scannerFrame}>
          {/* Bordas verdes simulando a leitura do QR Code */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        <Text style={styles.instructionText}>
          Aponte a câmera para o QR Code localizado no guidão do patinete
        </Text>
      </View>

      {/* CONTROLES POP-UP (Lanterna e Teclado) */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionPill} activeOpacity={0.7}>
          <Flashlight color="white" size={18} />
          <Text style={styles.actionText}>Ligar Lanterna</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionPill} activeOpacity={0.7}>
          <Keyboard color="white" size={18} />
          <Text style={styles.actionText}>Digitar ID</Text>
        </TouchableOpacity>
      </View>

      {/* RODAPÉ: Botão de Simulação do MVP */}
      <View style={styles.footer}>
        <AppButton
          title="Simular Desbloqueio (MVP)"
          onPress={() => {
            // Retorna para a Home passando o parâmetro que ativa a corrida
            router.replace("/?startRide=true");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fundo preto imitando a câmera desligada
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "flex-end",
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Fundo translúcido
    alignItems: "center",
    justifyContent: "center",
  },
  
  // MIRA DO SCANNER
  scannerArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerFrame: {
    width: 240,
    height: 240,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    position: "relative",
    marginBottom: 32,
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: Colors.primary, // Verde Zunn
    borderWidth: 4,
  },
  topLeft: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
  
  instructionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 24,
  },

  // BOTÕES FLUTUANTES SECUNDÁRIOS
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  actionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // RODAPÉ
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});