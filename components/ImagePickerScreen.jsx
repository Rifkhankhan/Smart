import React, {useState} from 'react';
import {Button, View, Image, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const ImagePickerScreen = () => {
  const [images, setImages] = useState([]); // State to store selected images

  const selectImages = () => {
    const options = {
      selectionLimit: 0, // 0 allows multiple selection
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImages(response.assets); // Update state with selected images
      }
    });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {/* Button to trigger image selection */}
      <Button title="Select Images" onPress={selectImages} />

      {/* Display selected images */}
      <ScrollView>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image.uri}}
            style={{width: 100, height: 100, margin: 10}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ImagePickerScreen;
