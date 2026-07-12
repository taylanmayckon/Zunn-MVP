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
    gap: 8,
  },
  title: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
});