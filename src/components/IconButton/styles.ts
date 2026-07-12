import { StyleSheet } from "react-native";
import { Colors } from "@/constants";

export default StyleSheet.create({
  button: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",
  },

  pressed: {
    opacity: 0.8,
  },
});