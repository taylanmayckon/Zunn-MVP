import { StyleSheet } from "react-native";
import { Colors } from "@/constants";

export default StyleSheet.create({
  container: {
    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    backgroundColor: Colors.surface,

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    padding: 24,

    paddingBottom: 36,

    minHeight: 240,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -5,
    },

    shadowOpacity: 0.3,

    shadowRadius: 12,

    elevation: 15,
  },

  handle: {
    width: 50,

    height: 5,

    borderRadius: 5,

    backgroundColor: Colors.border,

    alignSelf: "center",

    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#A1A1AA",
    marginTop: 6,
    marginBottom: 20,
  },
});

