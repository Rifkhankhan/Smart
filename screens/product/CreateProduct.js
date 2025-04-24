// import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { ScrollView } from "react-native";
// import React, {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useReducer,
//   useState,
// } from "react";
// import colors from "./../../constants/colors";

// import { getAuth } from "firebase/auth";
// import { validateInput } from "./../../utils/actions/formActions";
// import { ActivityIndicator, Alert } from "react-native";
// import Input from "./../../components/Input";
// import { Feather, FontAwesome } from "@expo/vector-icons";
// import { reducer } from "./../../utils//reducers/formReducer";
// import SubmitButton from "./../../components/SubmitButton";
// import SelectPicker from "./../../components/SelectPicker";
// import { createProduct } from "./../../utils/actions/productActions";
// import logoImage from "./../../assets/images/logo.jpg";
// import * as ImagePicker from 'expo-image-picker';

// import uploadImages from "../../functions/uploadImages";

// const CreateProduct = ({ navigation }) => {
//   const { authData } = useSelector((state) => state.auth);
//   const shops = useSelector((state) => state.shop.shops);
//   const [images, setImages] = useState([]); // State to store selected images

//   useEffect(() => {
//     const requestPermissions = async () => {
//       const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need media permissions to make this work!');
//       }
//     };
//     requestPermissions();
//   }, []);

//   const handleImageUpload = async (images, shopName) => {

//       try {

//         const urls = await uploadImages(images, shopName); // Call the function
//         return urls
//       } catch (error) {
//         console.error("Error uploading images:", error.message);
//       }
//     };

//   const pickImages = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,

//         allowsMultipleSelection: true, // Requires SDK 48+
//       });

//       if (!result.canceled) {

//         setImages(result.assets);
//       }

//     } catch (error) {
//       console.error("Image picker error:", error);
//     }
//   };

//   const initialState = {
//     inputValues: {
//       name: "",
//       description: "",
//       oPrice: 0,
//       price: 0,
//       category: "",
//       brand: "",
//       stock: 0,
//       //   shop:
//       // authData.role === "admin" ? "-O3MEJHhrshTHpG-oDhW" : authData.shopKey,
//       shop: authData.role === "admin" ? shops[0]?.shopKey : authData.shopKey,
//     },
//     inputValidities: {
//       name: false,
//       description: false,
//       oPrice: false,
//       price: false,
//       brand: false,
//       category: false,
//       stock: false,
//       //   shop: authData.role === "admin" ? undefined : undefined,
//       shop:
//         authData.role === "admin"
//           ? shops[0]?.shopKey
//             ? undefined
//             : false
//           : undefined,
//     },
//     formIsValid: false,
//   };
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formState, dispatchFormState] = useReducer(reducer, initialState);
//   const [tempImageUri, setTempImageUri] = useState("");
//   const dispatch = useDispatch();

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

//   const createProductHandler = useCallback(async () => {
//     try {
//       setIsLoading(true);

//       // check user authentication
//       // const auth = getAuth();
//       // if (!auth.currentUser) {
//       //   console.error("User is not authenticated.");
//       //   return;
//       // }

//         const imageUrls = await handleImageUpload(
//           images,
//           formState.inputValues.shop,
//         );

//        if(imageUrls?.length > 0) {
//             await createProduct({
//               name: formState.inputValues.name,
//               description: formState.inputValues.description,
//               stock: formState.inputValues.stock,
//               oPrice: formState.inputValues.oPrice,
//               price: formState.inputValues.price,
//               brand: formState.inputValues.brand,
//               category: formState.inputValues.category,
//               shopKey: formState.inputValues.shop,
//               uid: authData.uid,
//               images:[...imageUrls]
//             });

//        } else {
//         throw new Error("File upload problem");

//        }

//       setError(null);

//       //  await saveProductWithImages(formState.inputValues.shop, imageUrls);
//        console.log("Images uploaded and product saved successfully!");

//       setIsLoading(false);

//       navigation.navigate("ProductListPage");
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//   }, [dispatch, formState,images]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: "Create a Product",
//       headerStyle: { backgroundColor: "black" },
//       headerTintColor: "white",
//       contentStyle: { backgroundColor: "#12845f" },
//     });
//   }, [navigation]);

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={logoImage}
//           style={styles.logo}
//         />
//       </View>

//       <View style={styles.formContainer}>
//         <Text style={styles.heading}>Create a Product</Text>

//         <Input
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
//           placeholder="Old Price"
//           id="oPrice"
//           label="Old Price"
//           keyboardType="numeric"
//           icon="lock"
//           iconPack={Feather}
//           keyboard
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["oPrice"]}
//         />

//         <Input
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

//         {authData.role === "admin" && (
//           <SelectPicker
//             initialValue={formState.inputValues.shop}
//             placeholder="Shop"
//             id="shop"
//             label="Shop"
//             icon="lock"
//             datas={shops}
//             autoCapitalize="none"
//             iconPack={Feather}
//             onInputChanged={inputChangedHandler}
//             errorText={formState.inputValidities["shop"]}
//           />
//         )}

//           <View style={{flex: 1, padding: 20}}>
//               {/* Button to trigger image selection */}
//               <Button title="Select Images" onPress={pickImages} />

//               {/* Display selected images */}
//               <ScrollView horizontal style={styles.imageScroll}>
//                 {images?.length > 0 ? (
//                   images?.map((image, index) => (
//                     <Image
//                       key={index}
//                       source={{ uri: image.uri }}
//                       style={styles.imagePreview}
//                     />
//                   ))
//                 ) : (
//                   <Text>No images selected</Text>
//                 )}
//             </ScrollView>
//             </View>

//         {isLoading ? (
//           <ActivityIndicator
//             size={"small"}
//             color={colors.primary}
//             style={{ marginTop: 10 }}
//           />
//         ) : (

//           <SubmitButton
//             title="Create"
//             onPress={createProductHandler}
//             style={{ marginTop: 20 }}
//             disabled={!formState.formIsValid || (!images || !Array.isArray(images)|| images?.length === 0 )}
//           />
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateProduct;

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
//   imageScroll: {
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
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { getAuth } from "firebase/auth";
import { validateInput } from "../../utils/actions/formActions";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import SelectPicker from "../../components/SelectPicker";
import { createProduct } from "../../utils/actions/productActions";
import logoImage from "../../assets/images/logo.jpg";
import * as ImagePicker from "expo-image-picker";
import uploadImages from "../../functions/uploadImages";
import { reducer } from "./../../utils//reducers/formReducer";

const CreateProduct = ({ navigation }) => {
  const { authData } = useSelector((state) => state.auth);
  const shops = useSelector((state) => state.shop.shops);
  const [images, setImages] = useState([]); // State to store selected images
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  //   const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const initialState = {
    inputValues: {
      name: "",
      description: "",
      oPrice: 0,
      price: 0,
      category: "",
      brand: "",
      stock: 0,
      shop: authData.role === "admin" ? shops[0]?.shopKey : authData.shopKey,
    },
    inputValidities: {
      name: false,
      description: false,
      oPrice: false,
      price: false,
      brand: false,
      category: false,
      stock: false,
      shop: authData.role === "admin" ? false : undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({ inputId, validationResult: result, inputValue });
  }, []);

  const handleImageUpload = useCallback(async (images, shopName) => {
    try {
      const urls = await uploadImages(images, shopName); // Call the function
      return urls;
    } catch (error) {
      console.error("Error uploading images:", error.message);
      throw new Error("Image upload failed");
    }
  }, []);

  const pickImages = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        setImages(result.assets); // Set only image URIs to state
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need media permissions to make this work!");
      }
    };
    requestPermissions();
  }, []);

  const createProductHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const imageUrls = await handleImageUpload(
        images,
        formState.inputValues.shop
      );

      if (imageUrls?.length > 0) {
        await createProduct({
          name: formState.inputValues.name,
          description: formState.inputValues.description,
          stock: formState.inputValues.stock,
          oPrice: formState.inputValues.oPrice,
          price: formState.inputValues.price,
          brand: formState.inputValues.brand,
          category: formState.inputValues.category,
          shopKey: formState.inputValues.shop,
          uid: authData.uid,
          images: imageUrls,
        });
      } else {
        throw new Error("No images uploaded.");
      }

      setError(null);
      setIsLoading(false);
      navigation.navigate("ProductListPage");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [
    dispatch,
    formState,
    images,
    handleImageUpload,
    authData.uid,
    navigation,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a Product",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
      contentStyle: { backgroundColor: "#12845f" },
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Create a Product</Text>

        {/* Form inputs */}
        {[
          "name",
          "description",
          "price",
          "oPrice",
          "category",
          "brand",
          "stock",
        ].map((field) => (
          <Input
            key={field}
            placeholder={field}
            id={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            icon="user-o"
            iconPack={FontAwesome}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities[field]}
          />
        ))}

        {authData.role === "admin" && (
          <SelectPicker
            initialValue={formState.inputValues.shop}
            placeholder="Shop"
            id="shop"
            label="Shop"
            icon="lock"
            datas={shops}
            autoCapitalize="none"
            iconPack={Feather}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["shop"]}
          />
        )}

        {/* Image picker */}
        <View style={{ flex: 1, padding: 20 }}>
          <Button title="Select Images" onPress={pickImages} />
          <ScrollView horizontal style={styles.imageScroll}>
            {images?.length > 0 ? (
              images?.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.imagePreview}
                />
              ))
            ) : (
              <Text>No images selected</Text>
            )}
          </ScrollView>
        </View>

        {/* Submit button */}
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          <SubmitButton
            title="Create"
            onPress={createProductHandler}
            style={{ marginTop: 20 }}
            disabled={!formState.formIsValid || images?.length === 0}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    borderRadius: 8,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  imageScroll: {
    marginTop: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default CreateProduct;
