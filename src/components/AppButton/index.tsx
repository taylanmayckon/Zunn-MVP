import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
};

export default function AppButton({
  title,
  onPress,
  variant = "primary"
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "ghost" && styles.ghost,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText,
          variant === "ghost" && styles.ghostText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}