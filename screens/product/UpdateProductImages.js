// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import {  getFirebaseApp } from './../../utils/firebaseHelper'; // Adjust based on your Firebase setup
// import { getDatabase } from 'firebase/database';

// const fetchExistingImages = async (docId) => {
// const app = getFirebaseApp();
// const db = getDatabase(app);
//   const docRef = doc(db, docId, docId); // Replace 'collectionName' with your actual Firestore collection name
//   const snapshot = await getDoc(docRef);

//   if (snapshot.exists()) {
//     return snapshot.data()?.images || []; // Return existing images or an empty array if none exist
//   } else {
//     console.error('No such document!');
//     return [];
//   }
// };
// const mergeImageUrls = (existingUrls, newUrls) => {
  
//     return [...existingUrls, ...newUrls];
//   };
//   const updateImagesInDb = async (docId, updatedUrls) => {
//     const app = getFirebaseApp();
//     const db = getDatabase(app);
//     const docRef = doc(db, docId, docId); // Replace 'collectionName' with your actual Firestore collection name
  
//     await updateDoc(docRef, {
//       images: updatedUrls, // Update the `images` field with the new array
//     });
//     console.log('Images updated successfully!');
//   };

//   const updatedUrls = Array.from(new Set([...existingUrls, ...newUrls]));


// const UpdateProductImages = async (docId, uploadedImages, shopName) => {
//     console.log("docId : ",docId);
//     console.log("uploadedImages : ",uploadedImages);
//     console.log("shopName : ",shopName);
    
   
//     try {
//       // Fetch existing images from the database
//       const existingUrls = await fetchExistingImages(docId);

//       console.log("existingUrls : ",existingUrls);
      
  
//       // Upload new images and get their URLs
//       const newUrls = await handleImageUpload([...uploadedImages], shopName);
  
//       // Merge existing and new URLs
//       const updatedUrls = mergeImageUrls(existingUrls, newUrls);
  
//       // Update the database with the combined URLs
//       await updateImagesInDb(docId, updatedUrls);
  
//       console.log('Database updated with new images:', updatedUrls);
//     } catch (error) {
//       console.error('Error updating images:', error.message);
//     }
//   };

// export default UpdateProductImages

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirebaseApp } from './../../utils/firebaseHelper'; 
import { getDatabase } from 'firebase/database';

// Fetch existing images from the database
const fetchExistingImages = async (docId) => {
  const app = getFirebaseApp();
  const db = getDatabase(app);
  const docRef = doc(db, docId, docId); // Adjust based on actual Firestore collection
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return snapshot.data()?.images || []; // Return existing images or an empty array
  } else {
    console.error('No such document!');
    return [];
  }
};

// Merge new and existing URLs ensuring uniqueness
const mergeImageUrls = (existingUrls, newUrls) => {
  const combinedUrls = new Set([...existingUrls, ...newUrls]);
  return Array.from(combinedUrls); // Ensure uniqueness without duplicates
};

// Update images in the database
const updateImagesInDb = async (docId, updatedUrls) => {
  const app = getFirebaseApp();
  const db = getDatabase(app);
  const docRef = doc(db, docId, docId); // Adjust based on actual Firestore collection
  
  try {
    await updateDoc(docRef, { images: updatedUrls });
    console.log('Images updated successfully!');
  } catch (error) {
    console.error('Error updating images:', error.message);
  }
};

// Handle the product image update logic
const UpdateProductImages = async (docId, uploadedImages, shopName) => {
  console.log("docId:", docId);
  console.log("uploadedImages:", uploadedImages);
  console.log("shopName:", shopName);

  try {
    // Fetch existing images from the database
    const existingUrls = await fetchExistingImages(docId);
    console.log("existingUrls:", existingUrls);

    // Efficiently upload images (assuming handleImageUpload returns an array of URLs)
    const newUrls = await handleImageUpload(uploadedImages, shopName);
    
    // Merge existing and new URLs ensuring uniqueness
    const updatedUrls = mergeImageUrls(existingUrls, newUrls);
  
    // Update the database with the combined URLs
    await updateImagesInDb(docId, updatedUrls);
    
    console.log('Database updated with new images:', updatedUrls);
  } catch (error) {
    console.error('Error updating images:', error.message);
  }
};

export default UpdateProductImages;
