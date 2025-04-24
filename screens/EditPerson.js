// import {
//   Button,
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
// import colors from "../constants/colors";
// import { validateInput } from "../utils/actions/formActions";
// import { ActivityIndicator, Alert } from "react-native";
// import ProfileImage from "./../components/ProfileImage";

// import { Feather, FontAwesome } from "@expo/vector-icons";
// import { reducer } from "../utils/reducers/formReducer";
// import { updateCutomer } from "./../utils/actions/userActions";

// import SubmitButton from "../components/SubmitButton";
// import Input from "../components/Input";

// const EditPerson = ({ route, navigation }) => {
//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const customer = route?.params?.customer;

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: customer?.firstLast,
//     });
//   }, [route?.params]);

//   const initialState = {
//     inputValues: {
//       firstName: customer?.firstName ? customer?.firstName : "",
//       lastName: customer?.lastName ? customer?.lastName : "",
//       email: customer?.email ? customer?.email : "",
//       nic: customer?.nic ? customer?.nic : "",
//       address: customer?.address ? customer?.address : "",
//     },
//     inputValidities: {
//       firstName: undefined,
//       lastName: undefined,
//       email: undefined,
//       nic: undefined,
//       address: undefined,
//     },
//     formIsValid: false,
//   };

//   const [formState, dispatchFormState] = useReducer(reducer, initialState);

//   const dispatch = useDispatch();

//   useEffect(() => {}, [route?.params]);

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

//       const userData = {
//         firstName: formState.inputValues.firstName,
//         lastName: formState.inputValues.lastName,
//         email: formState.inputValues.email,
//         nic: formState.inputValues.nic,
//         address: formState.inputValues.address,
//       };

//       await updateCutomer(customer?.uid, userData);
//       setError(null);

//       setIsLoading(false);

//       navigation.navigate("CustomerList");
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

//   navigation.setOptions({
//     title: route?.params?.customer?.firstLast,
//     headerStyle: { backgroundColor: "black" },
//     headerTintColor: "white",
//     contentStyle: { backgroundColor: "#12845f" },

//     headerRight: ({ color, size }) => (
//       <Pressable
//         style={({ pressed }) => [
//           {
//             opacity: pressed ? "0.5" : 1,
//           },
//         ]}
//       >
//         <Ionicons
//           name="close"
//           size={24}
//           color="white"
//           style={{ marginRight: 10, fontWeight: 800 }}
//           onPress={closeEditHandler}
//         />
//       </Pressable>
//     ),
//   });
//   const hasChanges = () => {
//     const currentValues = formState.inputValues;

//     return (
//       currentValues.firstName != customer?.firstName ||
//       "" ||
//       currentValues.lastName != customer?.lastName ||
//       "" ||
//       currentValues.email != customer?.email ||
//       "" ||
//       currentValues.address != customer?.address ||
//       "" ||
//       currentValues.nic != customer?.nic ||
//       ""
//     );
//   };
//   return (
//     <ScrollView style={styles.container}>
//       <View style={{ margin: "auto" }}>
//         <ProfileImage
//           size={150}
//           userId={customer?.uid}
//           uri={customer?.profilePicture}
//           showEditButton={true}
//         />
//       </View>
//       <View style={styles.formContainer}>
//         <Input
//           initialValue={formState.inputValues.firstName}
//           id="firstName"
//           label="First name"
//           icon="user-o"
//           iconPack={FontAwesome}
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["firstName"]}
//         />

//         <Input
//           initialValue={formState.inputValues.lastName}
//           id="lastName"
//           label="Last name"
//           icon="user-o"
//           iconPack={FontAwesome}
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["lastName"]}
//         />

//         <Input
//           id="address"
//           label="Address"
//           initialValue={formState.inputValues.address}
//           icon="user-o"
//           iconPack={FontAwesome}
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["address"]}
//         />

//         <Input
//           id="email"
//           label="Email"
//           keyboardType="email-address"
//           icon="mail"
//           iconPack={Feather}
//           initialValue={formState.inputValues.email}
//           keyboard
//           onInputChanged={inputChangedHandler}
//           autoCapitalize="none"
//           errorText={formState.inputValidities["email"]}
//         />

//         <Input
//           id="nic"
//           label="Nic"
//           icon="lock"
//           autoCapitalize="none"
//           initialValue={formState.inputValues.nic}
//           iconPack={Feather}
//           onInputChanged={inputChangedHandler}
//           errorText={formState.inputValidities["nic"]}
//         />

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

// export default EditPerson;

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
// });

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import ProfileImage from "../components/ProfileImage";
import { reducer } from "../utils/reducers/formReducer";
import { updateCutomer } from "../utils/actions/userActions";
import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const EditPerson = ({ route, navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const customer = route?.params?.customer;

  const initialState = {
    inputValues: {
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      nic: customer?.nic || "",
      address: customer?.address || "",
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      nic: undefined,
      address: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const inputChangedHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({ inputId, validationResult: result, inputValue });
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = formState.inputValues;
      await updateCutomer(customer?.uid, userData);
      setError(null);
      navigation.navigate("CustomerList");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [formState, customer?.uid, navigation]);

  const closeEditHandler = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: customer?.firstLast || "Edit Person",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
      contentStyle: { backgroundColor: "#12845f" },
      headerRight: () => (
        <Pressable onPress={closeEditHandler}>
          <Ionicons
            name="close"
            size={24}
            color="white"
            style={{ marginRight: 10, fontWeight: "800" }}
          />
        </Pressable>
      ),
    });
  }, [navigation, customer]);

  const hasChanges = () => {
    const current = formState.inputValues;
    return (
      current.firstName !== customer?.firstName ||
      current.lastName !== customer?.lastName ||
      current.email !== customer?.email ||
      current.address !== customer?.address ||
      current.nic !== customer?.nic
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", marginVertical: 16 }}>
        <ProfileImage
          size={150}
          userId={customer?.uid}
          uri={customer?.profilePicture}
          showEditButton
        />
      </View>

      <View style={styles.formContainer}>
        <Input
          initialValue={formState.inputValues.firstName}
          id="firstName"
          label="First name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities.firstName}
        />
        <Input
          initialValue={formState.inputValues.lastName}
          id="lastName"
          label="Last name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities.lastName}
        />
        <Input
          initialValue={formState.inputValues.address}
          id="address"
          label="Address"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities.address}
        />
        <Input
          id="email"
          label="Email"
          keyboardType="email-address"
          icon="mail"
          iconPack={Feather}
          initialValue={formState.inputValues.email}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities.email}
        />
        <Input
          id="nic"
          label="NIC"
          icon="lock"
          iconPack={Feather}
          initialValue={formState.inputValues.nic}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities.nic}
        />

        <View style={{ marginTop: 20 }}>
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Save"
                onPress={authHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPerson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
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
});
