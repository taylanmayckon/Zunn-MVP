import { Colors } from "@/constants";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

export default function Screen({ children }: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
}