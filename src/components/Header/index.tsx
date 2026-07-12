import { View, Text } from "react-native";
import { Menu, Wallet, Zap } from "lucide-react-native";

import IconButton from "../IconButton";

import styles from "./styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <IconButton onPress={() => {}}>
        <Menu color="white" size={24} />
      </IconButton>

      <View style={styles.logo}>
        <Zap color="black" fill="black" />

        <Text style={styles.title}>
          ZUNN
        </Text>
      </View>

      <IconButton onPress={() => {}}>
        <Wallet color="white" size={22} />
      </IconButton>
    </View>
  );
}