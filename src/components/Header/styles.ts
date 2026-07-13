import { StyleSheet } from "react-native";
import { Colors } from "@/constants";

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    
    // Efeito de cápsula flutuante
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    
    // Borda sutil para não misturar com o mapa
    borderWidth: 1,
    borderColor: Colors.border,
    
    // Sombra leve para dar profundidade
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  title: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 16,
    // Espaçamento de letras (o grande segredo para logos em texto)
    letterSpacing: 2, 
  },
});