import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

import {
  useEffect,
  useRef,
} from "react";

import styles from "./styles";

import {
  MapPin,
  Wallet,
  X,
} from "lucide-react-native";


type Props = {
  visible: boolean;
  onClose: () => void;
};


export default function DrawerMenu({
  visible,
  onClose,
}: Props) {


  const translateX = useRef(
    new Animated.Value(-300)
  ).current;


  const opacity = useRef(
    new Animated.Value(0)
  ).current;



  useEffect(() => {


    if (visible) {


      Animated.parallel([

        Animated.spring(
          translateX,
          {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }
        ),


        Animated.timing(
          opacity,
          {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }
        )

      ]).start();



    } else {


      Animated.parallel([

        Animated.timing(
          translateX,
          {
            toValue: -300,
            duration: 200,
            useNativeDriver: true,
          }
        ),


        Animated.timing(
          opacity,
          {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }
        )

      ]).start();


    }


  }, [visible]);





  return (

    <Animated.View

      style={[
        styles.overlay,
        {
          opacity,
          pointerEvents:
            visible
              ? "auto"
              : "none",
        }
      ]}

    >


      <Animated.View

        style={[
          styles.container,

          {
            transform:[
              {
                translateX
              }
            ]
          }

        ]}

      >



        <TouchableOpacity
          style={styles.close}
          onPress={onClose}
        >

          <X
            size={26}
            color="white"
          />

        </TouchableOpacity>





        <View style={styles.profile}>


          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              GC
            </Text>

          </View>



          <View>

            <Text style={styles.name}>
              Gabriel
            </Text>


            <Text style={styles.subtitle}>
              Ver perfil
            </Text>

          </View>


        </View>





        <TouchableOpacity
          style={styles.item}
        >

          <MapPin
            size={25}
            color="#A3E635"
          />

          <Text style={styles.itemText}>
            Mapa
          </Text>

        </TouchableOpacity>






        <TouchableOpacity
          style={styles.item}
        >

          <Wallet
            size={25}
            color="#A3E635"
          />

          <Text style={styles.itemText}>
            Carteira
          </Text>

        </TouchableOpacity>







        <TouchableOpacity
          style={styles.logout}
        >

          <Text style={styles.logoutText}>
            Sair
          </Text>

        </TouchableOpacity>




      </Animated.View>



    </Animated.View>

  );
}