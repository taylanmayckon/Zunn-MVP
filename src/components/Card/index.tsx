import { View } from "react-native";
import styles from "./styles";

type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}