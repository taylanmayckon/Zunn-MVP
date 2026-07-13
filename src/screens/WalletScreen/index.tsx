import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { Plus, ArrowDownLeft, ArrowUpRight, ArrowLeft, CreditCard } from "lucide-react-native";
import { router } from "expo-router";
import styles from "./styles";

export default function WalletScreen() {
  const transactions = [
    { id: 1, title: "Corrida Zunn", value: "- R$ 3,40", type: "use" },
    { id: 2, title: "Recarga", value: "+ R$ 50,00", type: "add" },
    { id: 3, title: "Corrida Zunn", value: "- R$ 5,20", type: "use" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
          <ArrowLeft size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Carteira</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balance}>R$ 46,60</Text>
        <Pressable style={styles.addButton}>
          <Plus size={20} color="#09090b" />
          <Text style={styles.addText}>Adicionar saldo</Text>
        </Pressable>
      </View>

      {/* --- FORMA DE PAGAMENTO MOCKADA --- */}
      <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
      <View style={styles.paymentCard}>
        <View style={styles.iconBox}>
          <CreditCard size={22} color="#A3E635" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.transactionTitle}>Mastercard</Text>
          <Text style={styles.date}>Crédito •••• 4321</Text>
        </View>
        <Text style={styles.changePaymentText}>Trocar</Text>
      </View>

      <Text style={styles.sectionTitle}>Histórico</Text>

      {transactions.map((item) => (
        <View key={item.id} style={styles.transaction}>
          <View style={styles.iconBox}>
            {item.type === "add" ? (
              <ArrowDownLeft size={22} color="#A3E635" />
            ) : (
              <ArrowUpRight size={22} color="#ef4444" />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.date}>Hoje</Text>
          </View>
          <Text style={[styles.value, item.type === "add" ? styles.income : styles.expense]}>
            {item.value}
          </Text>
        </View>
      ))}

    </ScrollView>
  );
}