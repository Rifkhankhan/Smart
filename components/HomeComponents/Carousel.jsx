import React, { useState } from "react";
import { Dimensions, View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import image1 from "./../../assets/images/shop2.jpg";
import image2 from "./../../assets/images/shop3.jpg";
import image3 from "./../../assets/images/shop6.jpg";
import image4 from "./../../assets/images/shop6.jpg";

const images = [image1, image2, image3, image4];

const Carouselcomponent = () => {
  const width = Dimensions.get("window").width - 10;
  const height = width / 2 - 30;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.carouselContainer}>
      <View style={{ width, height, position: "relative" }}>
        <Carousel
          loop
          width={width}
          height={height}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
        />

        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Carouselcomponent;

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
});
