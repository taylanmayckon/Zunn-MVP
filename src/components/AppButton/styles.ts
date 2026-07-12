import { Colors } from "@/constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  primary: {
    backgroundColor: Colors.primary,
  },

  secondary: {
    backgroundColor: Colors.surface,
  },

  danger: {
    backgroundColor: Colors.danger,
  },

  text: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.8,
  },
});