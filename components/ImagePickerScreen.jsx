// import React, {useState} from 'react';
// import {Button, View, Image, ScrollView} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';

// const ImagePickerScreen = () => {
//   const [images, setImages] = useState([]); // State to store selected images

//   const selectImages = () => {
//     const options = {
//       selectionLimit: 0, // 0 allows multiple selection
//       mediaType: 'photo',
//     };

//     launchImageLibrary(options, (response) => {
//       if (!response.didCancel && !response.errorCode) {
//         setImages(response.assets); // Update state with selected images
//       }
//     });
//   };

//   return (
//     <View style={{flex: 1, padding: 20}}>
//       {/* Button to trigger image selection */}
//       <Button title="Select Images" onPress={selectImages} />

//       {/* Display selected images */}
//       <ScrollView>
//         {images.map((image, index) => (
//           <Image
//             key={index}
//             source={{uri: image.uri}}
//             style={{width: 100, height: 100, margin: 10}}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ImagePickerScreen;


import React, { useState, useCallback } from 'react';
import { Button, View, Image, FlatList, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'; // Fast image for caching and performance

const ImagePickerScreen = () => {
  const [images, setImages] = useState([]); // State to store selected images

  const selectImages = () => {
    const options = {
      selectionLimit: 0, // 0 allows multiple selection
      mediaType: 'photo',
      quality: 0.8, // Reduce image quality to save memory
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImages(response.assets); // Update state with selected images
      }
    });
  };

  const renderItem = useCallback(({ item }) => (
    <FastImage
      source={{ uri: item.uri }}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover} // Set resizeMode to improve image performance
    />
  ), []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Button to trigger image selection */}
      <Button title="Select Images" onPress={selectImages} />

      {/* Display selected images using FlatList for performance */}
      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          numColumns={3} // Display 3 images per row
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <Text style={styles.noImagesText}>No images selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  noImagesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default ImagePickerScreen;
