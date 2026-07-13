import { View, Text, Pressable } from "react-native";
import { Clock, Navigation, Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import styles from "./styles";

type Props = {
    onFinish: () => void;
};

export default function RidePanel({
    onFinish
}: Props) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");

    const secs = (seconds % 60)
        .toString()
        .padStart(2, "0");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Zap
                        size={24}
                        color="#09090b"
                        fill="#09090b"
                    />
                </View>

                <Text style={styles.title}>
                    Corrida ativa
                </Text>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                    <Clock
                        size={20}
                        color="#71717a"
                    />
                    <Text style={styles.value}>
                        {minutes}:{secs}
                    </Text>
                    <Text style={styles.label}>
                        Tempo
                    </Text>
                </View>

                <View style={styles.infoBox}>
                    <Navigation
                        size={20}
                        color="#71717a"
                    />
                    <Text style={styles.value}>
                        14 km/h
                    </Text>
                    <Text style={styles.label}>
                        Velocidade
                    </Text>
                </View>
            </View>

            <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>
                    Valor atual
                </Text>
                <Text style={styles.price}>
                    R$ {(seconds * 0.01).toFixed(2)}
                </Text>
            </View>

            <Pressable
                style={styles.button}
                onPress={onFinish}
            >
                <Text style={styles.buttonText}>
                    Encerrar viagem
                </Text>
            </Pressable>
        </View>
    );
}