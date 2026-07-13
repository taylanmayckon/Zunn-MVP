import { StyleSheet } from "react-native";


export default StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#09090b",
  padding:20,
},


title:{
  color:"white",
  fontSize:30,
  fontWeight:"700"
},


balanceCard:{
  backgroundColor:"#18181b",
  borderRadius:24,
  padding:24,
},


balanceLabel:{
  color:"#a1a1aa",
  fontSize:14,
},


balance:{
  color:"white",
  fontSize:38,
  fontWeight:"700",
  marginVertical:15,
},


addButton:{
  backgroundColor:"#A3E635",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  padding:14,
  borderRadius:14,
  gap:8,
},


addText:{
  color:"#09090b",
  fontWeight:"700",
},


sectionTitle:{
  color:"white",
  fontSize:20,
  fontWeight:"700",
  marginTop:32,
  marginBottom:15,
},


transaction:{
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#18181b",
  padding:16,
  borderRadius:18,
  marginBottom:12,
},


iconBox:{
  width:42,
  height:42,
  borderRadius:21,
  backgroundColor:"#27272a",
  justifyContent:"center",
  alignItems:"center",
  marginRight:12,
},


transactionTitle:{
  color:"white",
  fontSize:16,
  fontWeight:"600",
},


date:{
  color:"#71717a",
  marginTop:4,
},


value:{
  fontWeight:"700",
},


income:{
  color:"#A3E635",
},


expense:{
  color:"#ef4444",
},

header: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 28,
},

backButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#18181b",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 14,
},

paymentCard: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#18181b",
  padding: 16,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: "#27272a",
},
changePaymentText: {
  color: "#A3E635",
  fontWeight: "700",
  fontSize: 14,
},

});