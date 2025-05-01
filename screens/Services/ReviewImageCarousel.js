import React, { useEffect } from "react";
import { View, FlatList, Image, Text, Dimensions } from "react-native";

const ReviewImageCarousel = ({
  images,
  selectedIndex,
  onScrollIndexChange,
  flatListRef,
}) => {
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
    });
  }, [selectedIndex]);

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== selectedIndex) {
        onScrollIndexChange(index);
      }
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: Dimensions.get("window").width - 32,
              height: 220,
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
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
        {selectedIndex + 1}/{images.length}
      </Text>
    </View>
  );
};

export default ReviewImageCarousel;
