import { StyleSheet } from "react-native";

export const CustomBotttomSheetBarStyles = StyleSheet.create({
    container: { 
         flexDirection: "row",

        alignItems: "center",
        elevation: 20,
        paddingVertical: 6,
        paddingHorizontal: 2,
        backgroundColor: "white",
        borderTopColor: "aqua",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0, },
    priceContainer: { 
        marginLeft: 10,
        marginRight: "auto",
        flexDirection: "row", },
    rightBtnsContainer: { 
         flexDirection: "row",
        marginLeft: "auto", },
    addToCardbutton: {  
        padding: 12,
        elevation: 4,
        marginLeft: "auto",
        marginRight: 10,
        borderWidth: 0,
    
        borderRadius: 4,
        backgroundColor: "#ff5400", },
    buttonText: {  
        fontSize: 14,
        color: "white",
        paddingHorizontal: 8, },
  });



