import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#18181B",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    borderTopWidth: 1,
    borderColor: "#27272A",
  },
  handle: {
    width: 45,
    height: 5,
    backgroundColor: "#3F3F46",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 25,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A1A1AA",
    marginTop: 6,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Alterado para acomodar os dois textos
  },
  
  // --- NOVAS CLASSES DE BATERIA ---
  batteryBlock: {
    alignItems: "flex-end",
  },
  battery: {
    backgroundColor: "#27272A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  batteryText: {
    color: "#A3E635",
    fontWeight: "700",
  },
  rangeText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  // --------------------------------

  infoContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#09090B",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  infoLabel: {
    color: "#71717A",
    fontSize: 12,
  },
  infoValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },

  // --- NOVAS CLASSES DE BOTÕES SECUNDÁRIOS ---
  secondaryActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6, // Dá um respiro pequeno em relação ao botão de desbloqueio
    gap: 12,
  },
  bellButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3F3F46",
  },
});