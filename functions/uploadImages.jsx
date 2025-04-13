import React from 'react'
import { getFirebaseStorage } from '../utils/firebaseHelper';
import uuid from 'react-native-uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const generateImageName = (shopName) => {
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Format as YYYYMMDD
  const randomID = uuid.v4(); // Generate a unique ID
  return `${shopName}_${currentDate}_${randomID}`;
};

export const uploadWithRetry = async (reference, blob, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await uploadBytes(reference, blob);
        return await getDownloadURL(reference);
      } catch (error) {
        if (attempt === retries) throw error; // Throw error after last retry
        console.warn(`Retrying upload... Attempt ${attempt}`);
      }
    }
  };

const uploadImages = async (images, shopName) => {
  console.log("Starting uploadImages...");
  try {
    const storage = getFirebaseStorage();

    // Validate shopName
    if (!shopName || typeof shopName !== 'string') {
      throw new Error("Invalid shop name.");
    }

    // Generate upload promises
    const uploadPromises = images?.map(async (image) => {
      console.log("Processing image:", image.uri);

      // Validate image URI
      if (!image.uri || typeof image.uri !== 'string') {
        throw new Error(`Invalid image URI: ${image.uri}`);
      }

      const fileName = generateImageName(shopName);
      const storageRef = ref(storage, `products/${shopName}/${fileName}`);

      const response = await fetch(image.uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${image.uri}`);
      }

      const blob = await response.blob();

      console.log("Uploading image:", fileName);
      const downloadURL = await uploadWithRetry(storageRef, blob); // Use retry logic
      console.log("Download URL:", downloadURL);

      return downloadURL;
    });

    const uploadedURLs = await Promise.all(uploadPromises);
    console.log("Uploaded URLs:", uploadedURLs);

    return uploadedURLs;
  } catch (error) {
    console.error("Error in uploadImages:", error.message);
    throw error;
  }
};


export default uploadImages
