import {
  Button,
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
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import { ActivityIndicator, Alert } from "react-native";
import ProfileImage from "./../components/ProfileImage";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { reducer } from "../utils/reducers/formReducer";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { updateShop } from "../utils/actions/shopActions";
const EditShop = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const shop = route?.params?.shop;
  console.log(shop);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: shop?.name,
    });
  }, [route?.params]);

  const initialState = {
    inputValues: {
      name: shop?.name ? shop?.name : "",
      owner: shop?.owner ? shop?.owner : "",
      email: shop?.email ? shop?.email : "",
      village: shop?.village ? shop?.village : "",
      nic: shop?.nic ? shop?.nic : "",
      address: shop?.address ? shop?.address : "",
    },
    inputValidities: {
      name: undefined,
      owner: undefined,
      email: undefined,
      village: undefined,
      nic: undefined,
      address: undefined,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

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

  const updateShopHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const userData = {
        name: formState.inputValues.name,
        owner: formState.inputValues.owner,
        village: formState.inputValues.village,
        email: formState.inputValues.email,
        nic: formState.inputValues.nic,
        address: formState.inputValues.address,
      };
      await updateShop(shop?.uid, shop.shopKey, userData);

      setError(null);

      setIsLoading(false);

      navigation.navigate("SellerListPage");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  const closeEditHandler = () => {
    navigation.goBack();
  };

  navigation.setOptions({
    title: shop?.name,
    headerStyle: { backgroundColor: "black" },
    headerTintColor: "white",

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

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return (
      currentValues.name != shop?.name ||
      "" ||
      currentValues.village != shop?.village ||
      "" ||
      currentValues.owner != shop?.owner ||
      "" ||
      currentValues.email != shop?.email ||
      "" ||
      currentValues.address != shop?.address ||
      "" ||
      currentValues.nic != shop?.nic ||
      ""
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ margin: "auto" }}>
        <ProfileImage
          size={150}
          userId={shop?.uid}
          uri={shop?.profilePicture}
          showEditButton={true}
        />
      </View>
      <View style={styles.formContainer}>
        <Input
          initialValue={formState.inputValues.name}
          id="name"
          label="Shop Name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["name"]}
        />

        <Input
          initialValue={formState.inputValues.owner}
          id="owner"
          label="Owner name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["owner"]}
        />
        <Input
          id="village"
          label="Village"
          initialValue={formState.inputValues.village}
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["village"]}
        />
        <Input
          id="address"
          label="Address"
          initialValue={formState.inputValues.address}
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["address"]}
        />

        <Input
          id="email"
          label="Email"
          keyboardType="email-address"
          icon="mail"
          iconPack={Feather}
          initialValue={formState.inputValues.email}
          keyboard
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["email"]}
        />

        <Input
          id="nic"
          label="Nic"
          icon="lock"
          autoCapitalize="none"
          initialValue={formState.inputValues.nic}
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["nic"]}
        />

        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Update"
                onPress={updateShopHandler}
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

export default EditShop;

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
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    height: 100,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorMessageContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  errorMessage: {
    color: "white",
    fontSize: 16,
  },
  invalid: {
    borderColor: "red",
  },
});
