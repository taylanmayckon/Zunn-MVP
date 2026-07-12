import { Pressable } from "react-native";
import styles from "./styles";

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};

export default function IconButton({
  children,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}