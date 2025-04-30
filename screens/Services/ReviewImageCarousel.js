import React, { useState } from "react";
import { View, FlatList, Image, Text, Dimensions } from "react-native";
import defaultImage1 from "./../../assets/images/service/homemadethings.jpg";

const reviewImages = [
  defaultImage1,
  defaultImage1,
  defaultImage1,
  defaultImage1,
  defaultImage1,
  defaultImage1,
  defaultImage1,
  defaultImage1,
  defaultImage1,
];

const ReviewImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle page change
  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  return (
    <View style={{ position: "relative" }}>
      {/* Image Carousel */}
      <FlatList
        data={reviewImages}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: Dimensions.get("window").width - 32,
              height: 220,
              resizeMode: "cover",
              borderRadius: 10,
              marginHorizontal: 16,
            }}
          />
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50, // Set threshold for when an item is considered "viewable"
        }}
      />

      {/* Display the current image number */}
      <Text
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {currentIndex + 1}/{reviewImages.length}
      </Text>
    </View>
  );
};

export default ReviewImageCarousel;
