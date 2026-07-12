import { Pressable, Text } from "react-native";
import styles from "./styles";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}