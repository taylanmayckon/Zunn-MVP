import { View, TouchableOpacity, Text } from "react-native";
import { Menu, Wallet, Zap } from "lucide-react-native";
import { router } from "expo-router";
import IconButton from "../IconButton";

import styles from "./styles";

type Props = {
  onMenuPress: () => void;
};

export default function Header({ onMenuPress }: Props) {
  return (
    <View style={styles.container}>
      <IconButton onPress={onMenuPress}>
        <Menu color="white" size={24} />
      </IconButton>

      <View style={styles.logo}>
        <Zap color="black" fill="black" />

        <Text style={styles.title}>
          ZUNN
        </Text>
      </View>

      <IconButton
        onPress={() => {
          router.push("/wallet");
        }}
      >
        <Wallet color="white" size={22} />
      </IconButton>
    </View>
  );
}