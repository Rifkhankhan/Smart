// import { useNavigation } from '@react-navigation/native'
// import React from 'react'
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import defaultImage from './../../assets/images/man.png'

// const ServicesCard = ({service}) => {

//     const navigation = useNavigation()
//         const onPressHandler = () => {
//             navigation.navigate('ViewService', { service: service || {} })
//         }
//   return (
//     <TouchableOpacity style={styles.container} onPress={onPressHandler}>
//           <Image
//                 source={
//                     service?.image
//                         ? typeof service.image === 'string' // Check if it's a URL
//                             ? { uri: service.images } // Handle remote URL
//                             : service.image // Handle local file (e.g., require or import)
//                         :defaultImage
//                 }

//                 style={styles.image}
//             />

//         <Text style={styles.name} numberOfLines={2}>
//                     {service?.name}
//         </Text>

//          {/* Ratings */}
//         {service.ratings && <Text style={styles.ratings}>
//                 ⭐ {service?.ratings?.toFixed(1) || 'N/A'}
//         </Text>}
//     </TouchableOpacity>
//   )
// }

// export default ServicesCard

// const styles = StyleSheet.create({
//     container: {
//         width: 120, // Slightly larger for better aesthetics
//         height: 180,
//         margin:8,
//         marginBlock: 4,
//         borderRadius: 12,
//         backgroundColor: '#ffffff', // Subtle white background for contrast
//         elevation: 4, // Drop shadow for a floating effect (Android)
//         shadowColor: '#000', // Drop shadow for iOS
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         alignItems: 'center', // Center-align content
//     },
//     image: {
//         height: '70%', // Slightly larger image area
//         width: '90%',
//         marginTop: 10,
//         borderRadius: 8, // Rounded corners for a modern look
//     },
//     name: {
//         fontWeight: '600', // Bolder text for emphasis
//         fontSize: 14,
//         textAlign: 'center',
//         marginVertical: 'auto', // Spacing between image and text
//         color: '#333', // Darker text for readability
//         paddingHorizontal: 4,
//     },

//     ratings: {
//         fontWeight: '500',
//         fontSize: 12,
//         color: '#28a745', // Green for positive reinforcement
//         textAlign: 'left',
//         marginVertical: 2,
//     },
// });

import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import defaultImage from "./../../assets/images/man.png";

const ServicesCard = memo(({ service }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("ViewService", { service: service || {} });
  };

  const imageSource = service?.image
    ? typeof service.image === "string"
      ? { uri: service.image } // Handle remote URL
      : service.image // Handle local file (e.g., require or import)
    : defaultImage;

  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      <Image source={imageSource} style={styles.image} />

      <Text style={styles.name} numberOfLines={2}>
        {service?.name}
      </Text>

      {/* Ratings */}
      {/* {service.ratings && (
                <Text style={styles.ratings}>
                    ⭐ {service?.ratings?.toFixed(1) || 'N/A'}
                </Text>
            )} */}
    </TouchableOpacity>
  );
});

export default ServicesCard;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
    margin: 8,
    marginBlock: 4,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  image: {
    height: "70%",
    width: "90%",
    marginTop: 10,
    borderRadius: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    marginVertical: "auto",
    color: "#333",
    paddingHorizontal: 4,
  },
  ratings: {
    fontWeight: "500",
    fontSize: 12,
    color: "#28a745",
    textAlign: "left",
    marginVertical: 2,
  },
});
