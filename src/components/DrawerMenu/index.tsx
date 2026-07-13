import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";

import { useEffect, useRef } from "react";

import {
  MapPin,
  Wallet,
  X,
  Clock,
  CreditCard,
  HelpCircle,
  Settings,
  ChevronRight,
} from "lucide-react-native";

import { router } from "expo-router";
import styles from "./styles";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function DrawerMenu({ visible, onClose }: Props) {
  const translateX = useRef(new Animated.Value(-300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity,
          pointerEvents: visible ? "auto" : "none",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <X size={26} color="white" />
        </TouchableOpacity>

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TM</Text>
          </View>
          <View>
            <Text style={styles.name}>Taylan Mayckon</Text>
            <Text style={styles.subtitle}>Ver perfil</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* ITENS ATIVOS */}
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onClose();
              router.push("/");
            }}
          >
            <View style={styles.itemLeft}>
              <MapPin size={24} color="#A3E635" />
              <Text style={styles.itemText}>Mapa</Text>
            </View>
            <ChevronRight size={20} color="#3F3F46" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onClose();
              router.push("/wallet");
            }}
          >
            <View style={styles.itemLeft}>
              <Wallet size={24} color="#A3E635" />
              <Text style={styles.itemText}>Carteira</Text>
            </View>
            <ChevronRight size={20} color="#3F3F46" />
          </TouchableOpacity>

          {/* DIVISOR */}
          <View style={styles.divider} />

          {/* ITENS VISUAIS (MOCK) */}
          <View style={styles.itemMock}>
            <View style={styles.itemLeft}>
              <Clock size={24} color="#A1A1AA" />
              <Text style={styles.itemTextMock}>Histórico de Corridas</Text>
            </View>
          </View>

          <View style={styles.itemMock}>
            <View style={styles.itemLeft}>
              <CreditCard size={24} color="#A1A1AA" />
              <Text style={styles.itemTextMock}>Pagamento</Text>
            </View>
          </View>

          <View style={styles.itemMock}>
            <View style={styles.itemLeft}>
              <HelpCircle size={24} color="#A1A1AA" />
              <Text style={styles.itemTextMock}>Central de Ajuda</Text>
            </View>
          </View>

          <View style={styles.itemMock}>
            <View style={styles.itemLeft}>
              <Settings size={24} color="#A1A1AA" />
              <Text style={styles.itemTextMock}>Configurações</Text>
            </View>
          </View>
        </ScrollView>

        {/* SAIR (Fixo no rodapé) */}
        <TouchableOpacity style={styles.logout} onPress={onClose}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}