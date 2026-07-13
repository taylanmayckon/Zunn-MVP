import { View, Text } from "react-native";
import { Menu, Wallet, Zap } from "lucide-react-native";
import { router } from "expo-router";

import IconButton from "../IconButton";
import { Colors } from "@/constants";
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
        {/* Raio com a cor primária (Verde Neon) para dar destaque */}
        <Zap color={Colors.primary} fill={Colors.primary} size={18} />

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