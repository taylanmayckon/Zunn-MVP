import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#18181b",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    borderTopWidth: 1,
    borderColor: "#27272a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#A3E635",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#09090b",
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  value: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },
  label: {
    color: "#71717a",
    fontSize: 12,
  },
  priceBox: {
    marginTop: 15,
    marginBottom: 15,
  },
  priceLabel: {
    color: "#71717a",
  },
  price: {
    color: "#A3E635",
    fontSize: 28,
    fontWeight: "900",
  },
  button: {
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});