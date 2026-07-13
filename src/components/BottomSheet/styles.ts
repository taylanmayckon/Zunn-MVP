import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#18181B",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: "#27272A",
    // Sombra premium para descolar o BottomSheet do mapa
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#3F3F46",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A1A1AA",
    marginTop: 6,
    marginBottom: 24,
  },

  // --- CABEÇALHO DO PATINETE ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  scooterId: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
  },
  scooterLocation: {
    color: "#A1A1AA",
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  batteryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A3E635",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  batteryText: {
    color: "#09090b",
    fontWeight: "800",
    fontSize: 14,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3F3F46",
  },

  // --- GRID DE INFORMAÇÕES ---
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#09090B",
    borderRadius: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  dividerVertical: {
    width: 1,
    backgroundColor: "#27272A",
    height: "70%",
    alignSelf: "center",
  },
  statLabel: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "500",
  },
  statValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
  },

  // --- PLANEJAMENTO DE ROTA ---
  planRouteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3F3F46",
    borderStyle: "dashed",
    gap: 8,
    marginBottom: 20,
  },
  planRouteText: {
    color: "#A1A1AA",
    fontSize: 14,
    fontWeight: "600",
  },
  plannedRouteBox: {
    flexDirection: "row",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "#3B82F6",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  plannedRouteTitle: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  plannedRouteSubtitle: {
    color: "white",
    fontSize: 13,
  },
  infoLabel: {
    color: "#71717A",
    fontSize: 12,
  },
  plannedRoutePrice: {
    color: "#3B82F6",
    fontWeight: "800",
    fontSize: 16,
    marginTop: 2,
  },

  // --- AÇÕES PRINCIPAIS ---
  mainActions: {
    marginTop: "auto",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 8,
  },
  cancelText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "600",
  },
});