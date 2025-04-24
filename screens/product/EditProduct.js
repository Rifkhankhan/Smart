// import {
//   Button,
//   Dimensions,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useReducer,
//   useRef,
//   useState,
// } from "react";
// import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// import { useDispatch, useSelector } from "react-redux";
// import colors from "./../../constants/colors";
// import { validateInput } from "./../../utils/actions/formActions";
// import { ActivityIndicator, Alert } from "react-native";
// import ProfileImage from "./../../components/ProfileImage";

// import { Feather, FontAwesome } from "@expo/vector-icons";
// import { reducer } from "./../../utils/reducers/formReducer";
// import { updateCutomer } from "./../../utils/actions/userActions";

// import SubmitButton from "./../../components/SubmitButton";
// import Input from "./../../components/Input";
// import { updateProduct } from "../../utils/actions/productActions";
// import Carousel from "react-native-reanimated-carousel";
// import uploadImages from "../../functions/uploadImages";
// import * as ImagePicker from 'expo-image-picker';
// import defaultImage from './../../assets/images/man.png'

// // import UpdateProductImages from "./UpdateProductImages";

// const screenWidth = Dimensions.get("window").width;

// const EditProduct = ({ route, navigation }) => {
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const { product, shop } = route?.params;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [uploadedImages,setUploadedImages] = useState([])

//   const [images, setImages] = useState(
//     product?.images || [
//       defaultImage,defaultImage,defaultImage

//     ]
//   );

//    // Handler to delete an image
//    const deleteImageHandler = (index) => {
//     Alert.alert(
//       "Delete Image",
//       "Are you sure you want to delete this image?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             const updatedImages = images.filter((_, i) => i !== index);
//             setImages(updatedImages);
//           },
//         },
//       ]
//     );
//   };

//   // Handler to replace an image
//   const replaceImageHandler = (index) => {
//     // Example: Replace with a placeholder image (you can integrate an image picker)
//     const newImage = defaultImage;
//     const updatedImages = [...images];
//     updatedImages[index] = newImage;
//     setImages(updatedImages);
//   };

//   const initialState = {
//     inputValues: {
//       brand: product?.brand ? product?.brand : "",
//       category: product?.category ? product?.category : "",
//       description: product?.description ? product?.description : "",
//       name: product?.name ? product?.name : "",
//       stock: product?.stock ? product?.stock : "",
//       price: product?.price ? product?.price : 0,
//       oldPrice: product?.oPrice ? product?.oPrice : 0,
//     },
//     inputValidities: {
//       brand: undefined,
//       category: undefined,
//       description: undefined,
//       oldPrice: undefined,
//       name: undefined,
//       price: undefined,
//       stock: undefined,
//     },
//     formIsValid: false,
//   };

//   const [formState, dispatchFormState] = useReducer(reducer, initialState);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     navigation.setOptions({
//       title: route?.params?.product?.name,
//       headerStyle: { backgroundColor: "black" },
//       headerTintColor: "white",
//       contentStyle: { backgroundColor: "#12845f" },

//       headerRight: ({ color, size }) => (
//         <Pressable
//           style={({ pressed }) => [
//             {
//               opacity: pressed ? "0.5" : 1,
//             },
//           ]}
//         >
//           <Ionicons
//             name="close"
//             size={24}
//             color="white"
//             style={{ marginRight: 10, fontWeight: 800 }}
//             onPress={closeEditHandler}
//           />
//         </Pressable>
//       ),
//     });
//   }, [route?.params]);

//   const inputChangedHandler = useCallback(
//     (inputId, inputValue) => {
//       const result = validateInput(inputId, inputValue);
//       dispatchFormState({ inputId, validationResult: result, inputValue });
//     },
//     [dispatchFormState]
//   );

//   useEffect(() => {
//     if (error) {
//       Alert.alert("An error occured", error, [{ text: "Okay" }]);
//     }
//   }, [error]);

//   const authHandler = useCallback(async () => {
//     try {
//       setIsLoading(true);

//       // const imageUrls = await UpdateProductImages( 'products', uploadedImages, formState.inputValues.shop)

//       const userData = {
//         brand: formState.inputValues.brand,
//         category: formState.inputValues.category,
//         description: formState.inputValues.description,
//         oPrice: formState.inputValues.oldPrice,
//         name: formState.inputValues.name,
//         price: formState.inputValues.price,

//         stock: formState.inputValues.stock,
//         // images:[...imageUrls]
//       };

//       await updateProduct(product?.shopKey, product?.productKey, userData);
//       setError(null);

//       setIsLoading(false);

//       navigation.navigate("ProductListPage");
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//   }, [dispatch, formState]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: "Create Person",
//       headerStyle: { backgroundColor: "black" },
//       headerTintColor: "white",
//       contentStyle: { backgroundColor: "#12845f" },
//     });
//   }, [navigation]);

//   const closeEditHandler = () => {
//     navigation.goBack();
//   };

//   const hasChanges = () => {
//     const currentValues = formState.inputValues;

//     return (
//       currentValues.brand != product?.brand ||
//       "" ||
//       currentValues.category != product?.category ||
//       "" ||
//       currentValues.price != product?.price ||
//       "" ||
//       currentValues.oldPrice != product?.oldPrice ||
//       0 ||
//       currentValues.description != product?.description ||
//       "" ||
//       currentValues.stock != product?.stock ||
//       0 ||
//       currentValues.brand != product?.brand ||
//       ""
//     );
//   };

//    const pickImages = async () => {
//      try {
//        const result = await ImagePicker.launchImageLibraryAsync({
//          mediaTypes: ImagePicker.MediaTypeOptions.Images,

//          allowsMultipleSelection: true, // Requires SDK 48+
//        });

//        if (!result.canceled) {

//          setUploadedImages(result.assets);
//        }

//      } catch (error) {
//        console.error("Image picker error:", error);
//      }
//    };

//   // console.log(hasChanges());
//   return (
//     <ScrollView style={styles.container}>
//       <View style={{justifyContent:'center',alignItems:'center',width:'90%',margin:'auto'}}>

//         {/* Carousel */}
//         <Carousel
//           width={screenWidth}
//           height={300}
//           data={images}
//           renderItem={({ item, index }) => (
//             <View style={styles.imageContainer}>
//               <Image source={{ uri: item }} style={styles.image} />
//               <View style={styles.buttonContainer}>
//                 <Pressable
//                   style={styles.deleteButton}
//                   onPress={() => deleteImageHandler(index)}
//                 >
//                   <Text style={styles.buttonText}>Delete</Text>
//                 </Pressable>
//                 <Pressable
//                   style={styles.replaceButton}
//                   onPress={() => replaceImageHandler(index)}
//                 >
//                   <Text style={styles.buttonText}>Replace</Text>
//                 </Pressable>
//               </View>
//             </View>
//           )}
//         />

//           {/* Dots for Pagination */}
//               <View style={styles.pagination}>
//                 {images.map((_, index) => (
//                   <View
//                     key={index}
//                     style={[
//                       styles.dot,
//                       currentIndex === index ? styles.activeDot : styles.inactiveDot,
//                     ]}
//                   />
//                 ))}
//               </View>
//       </View>
//       <View style={styles.formContainer}>
//         <Input
//           initialValue={formState.inputValues.name}
//           placeholder="Name"
//           id="name"
//           label="Name"
//           icon="user-o"
//           iconPack={FontAwesome}
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["name"]}
//         />

//         <Input
//           initialValue={formState.inputValues.description}
//           placeholder="Description"
//           id="description"
//           label="Description"
//           icon="user-o"
//           iconPack={FontAwesome}
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["description"]}
//         />

//         <Input
//           initialValue={formState.inputValues.price}
//           placeholder="New Price"
//           id="price"
//           label="New Price"
//           icon="user-o"
//           keyboardType="numeric"
//           keyboard
//           iconPack={FontAwesome}
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["price"]}
//         />

//         <Input
//           initialValue={formState.inputValues.oldPrice}
//           placeholder="Old Price"
//           id="oldPrice"
//           label="Old Price"
//           keyboardType="numeric"
//           icon="lock"
//           iconPack={Feather}
//           keyboard
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["oldPrice"]}
//         />

//         <Input
//           initialValue={formState.inputValues.category}
//           placeholder="Category"
//           id="category"
//           label="Category"
//           icon="lock"
//           autoCapitalize="none"
//           iconPack={Feather}
//           onInputChanged={inputChangedHandler}
//           errorText={formState.inputValidities["category"]}
//         />

//         <Input
//           initialValue={formState.inputValues.brand}
//           placeholder="Brand"
//           id="brand"
//           label="Brand"
//           icon="lock"
//           autoCapitalize="none"
//           iconPack={Feather}
//           onInputChanged={inputChangedHandler}
//           errorText={formState.inputValidities["brand"]}
//         />

//         <Input
//           initialValue={formState.inputValues.stock}
//           placeholder="Stock"
//           id="stock"
//           label="Stock"
//           keyboardType="number-pad"
//           icon="lock"
//           autoCapitalize="none"
//           iconPack={Feather}
//           onInputChanged={inputChangedHandler}
//           errorText={formState.inputValidities["stock"]}
//         />

//         <View style={{flex: 1, padding: 20}}>
//             {/* Button to trigger image selection */}
//             <Button title="Upload new Images" onPress={pickImages} />

//             {/* Display selected images */}
//             <ScrollView horizontal style={styles.imageScroll}>
//               {uploadedImages?.length > 0 ? (
//                 uploadedImages?.map((image, index) => (
//                   <Image
//                     key={index}
//                     source={{ uri: image.uri }}
//                     style={styles.imagePreview}
//                   />
//                 ))
//               ) : (
//                 <Text>No images selected</Text>
//               )}
//             </ScrollView>
//         </View>

//         <View style={{ marginTop: 20 }}>
//           {showSuccessMessage && <Text>Saved!</Text>}

//           {isLoading ? (
//             <ActivityIndicator
//               size={"small"}
//               color={colors.primary}
//               style={{ marginTop: 10 }}
//             />
//           ) : (
//             hasChanges() && (
//               <SubmitButton
//                 title="Save"
//                 onPress={authHandler}
//                 style={{ marginTop: 20 }}
//                 disabled={!formState.formIsValid}
//               />
//             )
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default EditProduct;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//   },
//   logoContainer: {
//     alignItems: "center",
//     borderRadius: 8,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//   },
//   formContainer: {
//     backgroundColor: "#fff",
//     padding: 16,
//     marginVertical: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   textArea: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//     fontSize: 16,
//     height: 100,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   errorMessageContainer: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   errorMessage: {
//     color: "white",
//     fontSize: 16,
//   },
//   invalid: {
//     borderColor: "red",
//   },
//   imageContainer: {
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//     position: "absolute",
//     bottom: 10,
//     width: "80%",
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//   },
//   replaceButton: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 14,
//   },  pagination: {
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
//   },   imageScroll: {
//     marginTop: 20,
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//     borderRadius: 8,
//   },
// });

import {
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "./../../constants/colors";
import { validateInput } from "./../../utils/actions/formActions";
import { ActivityIndicator, Alert } from "react-native";
import ProfileImage from "./../../components/ProfileImage";

import { Feather, FontAwesome } from "@expo/vector-icons";
import { reducer } from "./../../utils/reducers/formReducer";
import { updateCutomer } from "./../../utils/actions/userActions";

import SubmitButton from "./../../components/SubmitButton";
import Input from "./../../components/Input";
import { updateProduct } from "../../utils/actions/productActions";
import Carousel from "react-native-reanimated-carousel";
import uploadImages from "../../functions/uploadImages";
import * as ImagePicker from "expo-image-picker";
import defaultImage from "./../../assets/images/man.png";

// import UpdateProductImages from "./UpdateProductImages";

const screenWidth = Dimensions.get("window").width;

const EditProduct = ({ route, navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { product, shop } = route?.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [images, setImages] = useState(
    product?.images || [defaultImage, defaultImage, defaultImage]
  );

  // Handler to delete an image
  const deleteImageHandler = (index) => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedImages = images.filter((_, i) => i !== index);
          setImages(updatedImages);
        },
      },
    ]);
  };

  // Handler to replace an image
  const replaceImageHandler = (index) => {
    // Example: Replace with a placeholder image (you can integrate an image picker)
    const newImage = defaultImage;
    const updatedImages = [...images];
    updatedImages[index] = newImage;
    setImages(updatedImages);
  };

  const initialState = {
    inputValues: {
      brand: product?.brand || "",
      category: product?.category || "",
      description: product?.description || "",
      name: product?.name || "",
      stock: product?.stock || "",
      price: product?.price || 0,
      oldPrice: product?.oPrice || 0,
    },
    inputValidities: {
      brand: undefined,
      category: undefined,
      description: undefined,
      oldPrice: undefined,
      name: undefined,
      price: undefined,
      stock: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.product?.name,
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
      contentStyle: { backgroundColor: "#12845f" },
      headerRight: ({ color, size }) => (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? "0.5" : 1,
            },
          ]}
        >
          <Ionicons
            name="close"
            size={24}
            color="white"
            style={{ marginRight: 10, fontWeight: 800 }}
            onPress={closeEditHandler}
          />
        </Pressable>
      ),
    });
  }, [route?.params]);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      // const imageUrls = await UpdateProductImages( 'products', uploadedImages, formState.inputValues.shop)

      const userData = {
        brand: formState.inputValues.brand,
        category: formState.inputValues.category,
        description: formState.inputValues.description,
        oPrice: formState.inputValues.oldPrice,
        name: formState.inputValues.name,
        price: formState.inputValues.price,
        stock: formState.inputValues.stock,
        // images:[...imageUrls]
      };

      await updateProduct(product?.shopKey, product?.productKey, userData);
      setError(null);

      setIsLoading(false);

      navigation.navigate("ProductListPage");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Person",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
      contentStyle: { backgroundColor: "#12845f" },
    });
  }, [navigation]);

  const closeEditHandler = () => {
    navigation.goBack();
  };

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return (
      currentValues.brand !== product?.brand ||
      currentValues.category !== product?.category ||
      currentValues.price !== product?.price ||
      currentValues.oldPrice !== product?.oldPrice ||
      currentValues.description !== product?.description ||
      currentValues.stock !== product?.stock
    );
  };

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, // Requires SDK 48+
      });

      if (!result.canceled) {
        setUploadedImages(result.assets);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          margin: "auto",
        }}
      >
        {/* Carousel */}
        <Carousel
          width={screenWidth}
          height={300}
          data={images}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteImageHandler(index)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable
                  style={styles.replaceButton}
                  onPress={() => replaceImageHandler(index)}
                >
                  <Text style={styles.buttonText}>Replace</Text>
                </Pressable>
              </View>
            </View>
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
      <View style={styles.formContainer}>
        <Input
          initialValue={formState.inputValues.name}
          placeholder="Name"
          id="name"
          label="Name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["name"]}
        />

        <Input
          initialValue={formState.inputValues.description}
          placeholder="Description"
          id="description"
          label="Description"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["description"]}
        />

        <Input
          initialValue={formState.inputValues.price}
          placeholder="New Price"
          id="price"
          label="New Price"
          icon="user-o"
          keyboardType="numeric"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["price"]}
        />

        <Input
          initialValue={formState.inputValues.oldPrice}
          placeholder="Old Price"
          id="oldPrice"
          label="Old Price"
          keyboardType="numeric"
          icon="lock"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["oldPrice"]}
        />

        <Input
          initialValue={formState.inputValues.category}
          placeholder="Category"
          id="category"
          label="Category"
          icon="lock"
          autoCapitalize="none"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["category"]}
        />

        <Input
          initialValue={formState.inputValues.brand}
          placeholder="Brand"
          id="brand"
          label="Brand"
          icon="lock"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["brand"]}
        />

        <Input
          initialValue={formState.inputValues.stock}
          placeholder="Stock"
          id="stock"
          label="Stock"
          icon="lock"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          keyboardType="numeric"
          errorText={formState.inputValidities["stock"]}
        />

        <SubmitButton
          title="Save"
          onPress={authHandler}
          isLoading={isLoading}
          disabled={!hasChanges()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: screenWidth - 40,
    height: 300,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  replaceButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 2,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
  formContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
});

export default EditProduct;
