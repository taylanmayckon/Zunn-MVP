import {
  View,
  Text,
  Animated,
} from "react-native";

import {
  useEffect,
  useRef,
} from "react";

import styles from "./styles";

import AppButton from "@/components/AppButton";

import type { Scooter } from "@/types";


type Props = {
  scooter: Scooter | null;
  onCancel: () => void;
};



export default function BottomSheet({
  scooter,
  onCancel
}: Props) {


  const height = useRef(
    new Animated.Value(220)
  ).current;



  useEffect(() => {


    Animated.spring(
      height,
      {
        toValue: scooter ? 360 : 220,

        friction: 8,

        tension: 40,

        useNativeDriver:false,
      }

    ).start();


  },[scooter]);




  return (

    <Animated.View

      style={[
        styles.container,

        {
          height
        }

      ]}

    >


      <View style={styles.handle}/>



      {
        !scooter ? (

          <>

            <Text style={styles.title}>
              Encontre um Zunn
            </Text>


            <Text style={styles.subtitle}>
              Selecione um patinete no mapa ou escaneie um QR Code.
            </Text>



            <AppButton
              title="Escanear QR Code"
              onPress={()=>{}}
            />

          </>


        ) : (


          <>


            <View style={styles.header}>


              <View>

                <Text style={styles.title}>
                  {scooter.id}
                </Text>


                <Text style={styles.subtitle}>
                  {scooter.location}
                </Text>


              </View>



              <View style={styles.battery}>


                <Text style={styles.batteryText}>
                  🔋 {scooter.battery}%
                </Text>


              </View>


            </View>





            <View style={styles.infoContainer}>


              <View style={styles.infoCard}>

                <Text style={styles.infoLabel}>
                  Desbloqueio
                </Text>


                <Text style={styles.infoValue}>
                  R$ 2,50
                </Text>


              </View>





              <View style={styles.infoCard}>

                <Text style={styles.infoLabel}>
                  Por minuto
                </Text>


                <Text style={styles.infoValue}>
                  R$ 0,60
                </Text>


              </View>



            </View>


            <AppButton

              title="Escanear para Desbloquear"

              onPress={()=>{}}

            />


            <AppButton

              title="Cancelar"

              variant="ghost"

              onPress={onCancel}

            />



          </>


        )
      }


    </Animated.View>


  );
}