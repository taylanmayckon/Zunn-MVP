import { View, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";

import { Zap } from "lucide-react-native";


import { Colors } from "@/constants";

import type { Scooter } from "@/types";


type Props = {

  scooter: Scooter;

  onPress: () => void;

  selected: boolean;

};


export default function ScooterMarker({

  scooter,

  onPress,

  selected,

}: Props) {


  return (

    <Marker

      coordinate={{

        latitude: scooter.latitude,

        longitude: scooter.longitude,

      }}

      onPress={onPress}

    >


      <View
        style={{

          alignItems: "center",

          transform: [
            {
              scale: selected ? 1.2 : 1,
            },
          ],

        }}
      >


        {/* Bateria */}

        <View
          style={{

            backgroundColor: selected
              ? Colors.white
              : Colors.surface,


            paddingHorizontal: 8,

            paddingVertical: 3,

            borderRadius: 12,

            marginBottom: 5,

          }}
        >

          <Text
            style={{

              color: selected
                ? Colors.black
                : Colors.primary,


              fontWeight: "700",

              fontSize: 12,

            }}
          >

            {scooter.battery}%

          </Text>


        </View>



        {/* Ícone */}

        <View

          style={{

            width: selected ? 44 : 36,

            height: selected ? 44 : 36,


            borderRadius: selected ? 22 : 18,


            backgroundColor: selected
              ? Colors.primary
              : Colors.surface,


            borderWidth: 2,


            borderColor: selected
              ? Colors.white
              : Colors.primary,


            justifyContent: "center",

            alignItems: "center",

          }}

        >


          <Zap

            size={selected ? 22 : 18}


            color={
              selected
                ? Colors.black
                : Colors.primary
            }


            fill={
              selected
                ? Colors.black
                : Colors.primary
            }


          />


        </View>


      </View>


    </Marker>

  );

}