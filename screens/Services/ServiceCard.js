import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ServiceCard = ({ service }) => {
  const navigation = useNavigation();  

  // console.log(service);
  

  const detailsHandler = () => {
    navigation.push("ViewService", {
      service: service || {},
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={detailsHandler}>
      {/* Service Image */}
      {/* <Image
        source={{
          uri: service?.image
            ? service?.image
            : "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708858980/cld-sample-5.jpg",
        }}
        style={styles.image}
      /> */}

        <Image
            source={ service?.images[0]}
            style={styles.image}
        />

      {/* Service Details */}
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.serviceName}>
          {service?.name || "Service Name"}
        </Text>
        <View style={styles.reviewStars}>
          <Ionicons name="star" color="#FFD700" size={18} />
          <Text style={styles.reviewRate}>4/5 (71)</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {service?.description || "Brief description of the service goes here."}
        </Text>
      </View>

      {/* Call to Action */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 320,
    width: "48%",
    margin: 4,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 5, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    height: 160,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  details: {
    padding: 12,
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewRate: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  actionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: {
    backgroundColor: "#FF5400",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ServiceCard;


// import React, { memo } from "react";
// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import defaultImage from './../../assets/images/man.png';

// const ServiceCard = memo(({ service }) => {
//   const navigation = useNavigation();

//   // Navigate to the service details screen
//   const detailsHandler = () => {
//     navigation.push("ViewService", { service: service || {} });
//   };

//   // Default image URL (use a fallback image if `service.images[0]` is undefined)
//   const imageSource = service?.images[0] || defaultImage

//   return (
//     <TouchableOpacity style={styles.card} onPress={detailsHandler}>
//       {/* Service Image */}
//       <Image source={ imageSource } style={styles.image} />

//       {/* Service Details */}
//       <View style={styles.details}>
//         <Text numberOfLines={1} style={styles.serviceName}>
//           {service?.name || "Service Name"}
//         </Text>
//         <View style={styles.reviewStars}>
//           <Ionicons name="star" color="#FFD700" size={18} />
//           <Text style={styles.reviewRate}>4/5 (71)</Text>
//         </View>
//         <Text style={styles.description} numberOfLines={2}>
//           {service?.description || "Brief description of the service goes here."}
//         </Text>
//       </View>

//       {/* Call to Action */}
//       <View style={styles.actionContainer}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>Learn More</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// });

// const styles = StyleSheet.create({
//   card: {
//     height: 320,
//     width: "48%",
//     margin: 4,
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     overflow: "hidden",
//     elevation: 5, // Shadow for Android
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   image: {
//     height: 160,
//     width: "100%",
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   details: {
//     padding: 12,
//     flex: 1,
//   },
//   serviceName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 6,
//   },
//   reviewStars: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   reviewRate: {
//     fontSize: 14,
//     color: "#666",
//     marginLeft: 4,
//   },
//   description: {
//     fontSize: 14,
//     color: "#777",
//     marginBottom: 8,
//   },
//   actionContainer: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     backgroundColor: "#f9f9f9",
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   actionButton: {
//     backgroundColor: "#FF5400",
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: "center",
//   },
//   actionText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#fff",
//   },
// });

// export default ServiceCard;
