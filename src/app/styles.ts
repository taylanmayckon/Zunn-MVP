import { StyleSheet } from "react-native";


export default StyleSheet.create({

container:{
    flex:1,
    backgroundColor:"#000",
    alignItems:"center",
    justifyContent:"center",
},


closeButton:{
    position:"absolute",
    top:50,
    left:25,

    width:48,
    height:48,

    borderRadius:24,

    backgroundColor:"#18181b",

    alignItems:"center",
    justifyContent:"center",
},


title:{
    position:"absolute",
    top:110,

    color:"white",

    fontSize:22,
    fontWeight:"700",
},


qrBox:{
    width:260,
    height:260,

    position:"relative",

},



cornerTopLeft:{
    position:"absolute",

    top:0,
    left:0,

    width:45,
    height:45,

    borderTopWidth:4,
    borderLeftWidth:4,

    borderColor:"#A3E635",
},


cornerTopRight:{
    position:"absolute",

    top:0,
    right:0,

    width:45,
    height:45,

    borderTopWidth:4,
    borderRightWidth:4,

    borderColor:"#A3E635",
},


cornerBottomLeft:{
    position:"absolute",

    bottom:0,
    left:0,

    width:45,
    height:45,

    borderBottomWidth:4,
    borderLeftWidth:4,

    borderColor:"#A3E635",
},


cornerBottomRight:{
    position:"absolute",

    bottom:0,
    right:0,

    width:45,
    height:45,

    borderBottomWidth:4,
    borderRightWidth:4,

    borderColor:"#A3E635",
},



scanLine:{
    position:"absolute",

    top:"50%",

    width:"100%",
    height:2,

    backgroundColor:"#A3E635",
},



subtitle:{
    color:"#A1A1AA",

    marginTop:40,

},


button:{
    position:"absolute",

    bottom:80,

    backgroundColor:"#18181b",

    paddingHorizontal:30,
    paddingVertical:16,

    borderRadius:18,

    borderWidth:1,
    borderColor:"#27272a",
},


buttonText:{
    color:"white",

    fontWeight:"700",

    fontSize:16,
}

});