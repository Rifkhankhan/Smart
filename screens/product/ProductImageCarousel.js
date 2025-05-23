// import React, { useEffect, useLayoutEffect, useState } from "react";
// import { View, Image, StyleSheet, Dimensions } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import defaultImage from './../../assets/images/man.png'

// const screenWidth = Dimensions.get("window").width;

// const ProductScreen = ({ productImages }) => {

  
//   useLayoutEffect(() =>{},[productImages])

  
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const images = productImages || [
//     defaultImage,
 


//   ];

//   return (
//     <View style={styles.container}>
//       <Carousel
//         width={screenWidth}
//         height={300}
//         data={images}
//         scrollAnimationDuration={600}
//         onSnapToItem={(index) => setCurrentIndex(index)} // Track the active slide
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={styles.image} />
//         )}
//       />

//       {/* Dots for Pagination */}
//       <View style={styles.pagination}>
//         {images.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               currentIndex === index ? styles.activeDot : styles.inactiveDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: "blue",
//     width:15,
//     height:15,
//     borderRadius: 10,

//   },
//   inactiveDot: {
//     backgroundColor: "gray",
//   },
// });

// export default ProductScreen;


import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import defaultImage from './../../assets/images/man.png';

const screenWidth = Dimensions.get("window").width;

const ProductScreen = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = productImages && productImages.length > 0 ? productImages : [defaultImage];

  useEffect(() => {
    // Only reset the current index if productImages changes
    setCurrentIndex(0);
  }, [productImages]);

  return (
    <View style={styles.container}>
      <Carousel
        width={screenWidth}
        height={300}
        data={images}
        scrollAnimationDuration={600}
        onSnapToItem={setCurrentIndex} // Simplified updating state
        renderItem={({ item }) => (
          <Image source={typeof item === 'string' ? { uri: item } : item} style={styles.image} />
        )}
      />

      {/* Dots for Pagination */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "blue",
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});

export default ProductScreen;
