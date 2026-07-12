import {
  StyleSheet
} from "react-native";


export default StyleSheet.create({

container:{


  position:"absolute",


  bottom:0,


  width:"100%",


  backgroundColor:"#18181B",


  borderTopLeftRadius:30,

  borderTopRightRadius:30,


  padding:24,


  borderTopWidth:1,

  borderColor:"#27272A",


},



handle:{


  width:45,

  height:5,


  backgroundColor:"#3F3F46",


  borderRadius:10,


  alignSelf:"center",


  marginBottom:25,


},



title:{


  color:"white",


  fontSize:24,


  fontWeight:"700",


},



subtitle:{


  color:"#A1A1AA",


  marginTop:6,


  marginBottom:20,


},



header:{


  flexDirection:"row",

  justifyContent:"space-between",

  alignItems:"center",


},



battery:{


  backgroundColor:"#27272A",

  paddingHorizontal:12,

  paddingVertical:8,

  borderRadius:20,


},



batteryText:{


  color:"#A3E635",


  fontWeight:"700",


},



infoContainer:{


  flexDirection:"row",

  gap:12,

  marginBottom:20,


},



infoCard:{


  flex:1,


  backgroundColor:"#09090B",


  padding:14,


  borderRadius:18,


  borderWidth:1,

  borderColor:"#27272A",


},



infoLabel:{


  color:"#71717A",

  fontSize:12,


},



infoValue:{


  color:"white",

  fontSize:18,

  fontWeight:"700",

  marginTop:5,


},


});