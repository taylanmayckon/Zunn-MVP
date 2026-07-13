import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 999,
  },
  container: {
    width: "75%",
    height: "100%",
    backgroundColor: "#09090B",
    paddingTop: 60, // Espaço seguro do topo
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderRightWidth: 1,
    borderRightColor: "#27272A",
  },
  close: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 40,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#A3E635",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#09090B",
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A1A1AA",
    marginTop: 4,
    fontSize: 14,
  },
  
  // ITENS DO MENU
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  itemText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  // DIVISOR
  divider: {
    height: 1,
    backgroundColor: "#27272A",
    marginTop: 5,
    marginBottom: 30,
  },

  // ITENS MOCK
  itemMock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    opacity: 0.6, // Deixa sutilmente apagado para indicar que não é clicável no momento
  },
  itemTextMock: {
    color: "#A1A1AA",
    fontSize: 17,
    fontWeight: "500",
  },

  // RODAPÉ
  logout: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#27272A",
  },
  logoutText: {
    color: "#ef4444", // Um tom avermelhado sutil para o botão de sair
    fontSize: 16,
    fontWeight: "600",
  },

  // BANNER DE MONETIZAÇÃO ZUNN PRO
  promoBanner: {
    backgroundColor: "rgba(163, 230, 53, 0.12)", // Fundo verde transparente
    borderWidth: 1,
    borderColor: "rgba(163, 230, 53, 0.3)",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 32, // Empurra os outros itens para baixo
  },
  promoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A3E635",
    justifyContent: "center",
    alignItems: "center",
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    color: "#A3E635",
    fontSize: 16,
    fontWeight: "bold",
  },
  promoSubtitle: {
    color: "#D4D4D8",
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
});