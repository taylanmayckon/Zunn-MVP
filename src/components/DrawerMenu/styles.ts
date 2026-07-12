import {
  StyleSheet
} from "react-native";


export default StyleSheet.create({


  overlay: {

    position:"absolute",

    top:0,
    left:0,
    right:0,
    bottom:0,

    backgroundColor:
      "rgba(0,0,0,0.6)",

    zIndex:999,

  },



  container:{


    width:"75%",

    height:"100%",


    backgroundColor:"#09090B",


    padding:24,


    borderRightWidth:1,

    borderRightColor:"#27272A",


  },



  close:{


    alignSelf:"flex-end",


    marginBottom:40,


  },



  profile:{


    flexDirection:"row",

    alignItems:"center",


    gap:15,


    marginBottom:50,


  },



  avatar:{


    width:64,

    height:64,


    borderRadius:32,


    backgroundColor:"#A3E635",


    justifyContent:"center",

    alignItems:"center",


  },



  avatarText:{


    color:"#09090B",


    fontSize:22,


    fontWeight:"bold",


  },



  name:{


    color:"white",


    fontSize:18,


    fontWeight:"700",


  },



  subtitle:{


    color:"#A1A1AA",


    marginTop:4,


  },



  item:{


    flexDirection:"row",


    alignItems:"center",


    gap:18,


    marginBottom:28,


  },



  itemText:{


    color:"white",


    fontSize:18,


    fontWeight:"600",


  },



  logout:{


    marginTop:"auto",


  },



  logoutText:{


    color:"#A1A1AA",


    fontSize:18,


  },


});