import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import defaultImage1 from "./../../../assets/images/service/homemadethings.jpg";
import defaultImage2 from "./../../../assets/images/service/homemadefood.jpg";

const reviewImages = [
  defaultImage1,
  defaultImage2,
  defaultImage1,
  defaultImage2,
  defaultImage1,
  defaultImage2,
  defaultImage1,
  defaultImage2,
  defaultImage1,
];

export const ThumbnailGrid = ({ images, selectedIndex, onThumbnailPress }) => {
  //   const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages = images.length > 5 ? images.slice(0, 5) : images;
  const remainingCount = images.length - 5;

  return (
    <View style={styles.gridContainer}>
      {displayImages.map((image, index) => {
        const isLastVisible = index === 4 && remainingCount > 0;
        const isSelected = index === selectedIndex;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onThumbnailPress(index)}
            style={[
              styles.thumbnailWrapper,
              isSelected && styles.selectedBorder,
            ]}
          >
            <Image source={image} style={styles.thumbnail} />
            {isLastVisible && (
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{remainingCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const THUMB_SIZE = (Dimensions.get("window").width - 200) / 3;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 14,
    backgroundColor: "#efdecd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  thumbnailWrapper: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginRight: 8,
    marginBottom: 8,
    position: "relative",
    borderRadius: 8,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: "#ff9900",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
