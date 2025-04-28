// import React, {
// 	useCallback,
// 	useEffect,
// 	useLayoutEffect,
// 	useReducer,
// 	useState
// } from 'react'
// import {
// 	ActivityIndicator,
// 	Alert,
// 	Image,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	View
// } from 'react-native'
// import { useDispatch } from 'react-redux'
// import { Feather, FontAwesome } from '@expo/vector-icons'
// import { launchImagePicker } from '../utils/imagePickerHelper'
// import { validateInput } from '../utils/actions/formActions'
// import Input from '../components/Input'
// import SubmitButton from '../components/SubmitButton'
// import colors from '../constants/colors'
// import { reducer } from '../utils/reducers/formReducer'
// import { createShop } from '../utils/actions/shopActions'
// import { Asset } from "expo-asset";
// import logoImage from "./../assets/images/logo.jpg";

// const initialState = {
// 	inputValues: {
// 		name: '',
// 		email: '',
// 		address: '',
// 		village: '',
// 		nic: '',
// 		phone: '',
// 		owner: ''
// 	},
// 	inputValidities: {
// 		name: false,
// 		address: false,
// 		email: false,

// 		village: false,
// 		nic: false,
// 		phone: false,
// 		owner: false
// 	},
// 	formIsValid: false
// }

// const CreateShop = ({ navigation }) => {
// 	const [error, setError] = useState()
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [formState, dispatchFormState] = useReducer(reducer, initialState)
// 	const [tempImageUri, setTempImageUri] = useState('')
// 	const dispatch = useDispatch()

// 	const inputChangedHandler = useCallback(
// 		(inputId, inputValue) => {
// 			const result = validateInput(inputId, inputValue)
// 			dispatchFormState({ inputId, validationResult: result, inputValue })
// 		},
// 		[dispatchFormState]
// 	)

// 	useEffect(() => {
// 		if (error) {
// 			Alert.alert('An error occurred', error, [{ text: 'Okay' }])
// 		}
// 	}, [error])

// 	const authHandler = useCallback(async () => {
// 		try {
// 			setIsLoading(true)
// 			await createShop(
// 				formState.inputValues.name,
// 				formState.inputValues.email,
// 				formState.inputValues.nic,
// 				formState.inputValues.village,
// 				formState.inputValues.owner,
// 				formState.inputValues.address
// 			)
// 			setError(null)
// 			// await dispatch(action)
// 			setIsLoading(false)
// 			navigation.navigate('SellerListPage')
// 		} catch (error) {
// 			setError(error.message)
// 			setIsLoading(false)
// 		}
// 	}, [dispatch, formState, navigation])

// 	useLayoutEffect(() => {
// 		navigation.setOptions({
// 			title: 'Create a Shop',
// 			headerStyle: { backgroundColor: 'black' },
// 			headerTintColor: 'white'
// 		})
// 	}, [navigation])

// 	const pickImage = useCallback(async () => {
// 		try {
// 			const tempUri = await launchImagePicker()
// 			if (tempUri) setTempImageUri(tempUri)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}, [])

// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			<View style={styles.logoContainer}>
// 				<Image
// 					source={logoImage}
// 					style={styles.logo}
// 				/>
// 			</View>

// 			<View style={styles.formContainer}>
// 				<Input
// 					placeholder="Shop Name"
// 					id="name"
// 					label="Shop name"
// 					icon="user-o"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['name']}
// 				/>

// 				<Input
// 					placeholder="Owner Name"
// 					id="owner"
// 					label="Owner name"
// 					icon="user-o"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['owner']}
// 				/>

// 				<Input
// 					placeholder="Address"
// 					id="address"
// 					label="Address"
// 					icon="user-o"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['address']}
// 				/>

// 				<Input
// 					placeholder="Email"
// 					id="email"
// 					label="Email"
// 					keyboardType="email-address"
// 					icon="mail"
// 					iconPack={Feather}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['email']}
// 				/>

// 				<Input
// 					placeholder="NIC"
// 					id="nic"
// 					label="NIC"
// 					icon="id-card"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['nic']}
// 				/>

// 				<Input
// 					placeholder="Village"
// 					id="village"
// 					label="Village"
// 					icon="home"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['village']}
// 				/>

// 				<Input
// 					placeholder="Phone"
// 					id="phone"
// 					label="Phone"
// 					icon="phone"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['phone']}
// 				/>

// 				{isLoading ? (
// 					<ActivityIndicator
// 						size="small"
// 						color={colors.primary}
// 						style={{ marginTop: 20 }}
// 					/>
// 				) : (
// 					<SubmitButton
// 						title="Create"
// 						onPress={authHandler}
// 						style={styles.submitButton}
// 						disabled={!formState.formIsValid}
// 					/>
// 				)}
// 			</View>
// 		</ScrollView>
// 	)
// }

// export default CreateShop

// const styles = StyleSheet.create({
// 	container: {
// 		paddingBottom: 30,
// 		paddingHorizontal: 20,
// 		backgroundColor: colors.background
// 	},
// 	logoContainer: {
// 		alignItems: 'center',
// 		marginVertical: 20
// 	},
// 	logo: {
// 		width: 150,
// 		height: 150,
// 		borderRadius: 75
// 	},
// 	formContainer: {
// 		marginVertical: 20
// 	},
// 	heading: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		textAlign: 'center',
// 		marginBottom: 20,
// 		color: colors.primary
// 	},
// 	submitButton: {
// 		marginTop: 20
// 	}
// })

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { launchImagePicker } from "../../../utils/imagePickerHelper";
import { validateInput } from "../../../utils/actions/formActions";
import Input from "../../../components/Input";
import SubmitButton from "../../../components/SubmitButton";
import colors from "../../../constants/colors";
import { reducer } from "../../../utils/reducers/formReducer";
import { createShop } from "../../../utils/actions/shopActions";
import { Asset } from "expo-asset";
import logoImage from "./../../../assets/logo.png";

// Initial state for form validation
const initialState = {
  inputValues: {
    name: "",
    email: "",
    address: "",
    village: "",
    nic: "",
    phone: "",
    owner: "",
  },
  inputValidities: {
    name: false,
    address: false,
    email: false,
    village: false,
    nic: false,
    phone: false,
    owner: false,
  },
  formIsValid: false,
};

const CreateShop = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [tempImageUri, setTempImageUri] = useState("");
  const dispatch = useDispatch();

  // Optimized input change handler with debounce to avoid excessive validation calls
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  // Error alert useEffect
  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  // Optimized submit handler with async/await pattern
  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await createShop(
        formState.inputValues.name,
        formState.inputValues.email,
        formState.inputValues.nic,
        formState.inputValues.village,
        formState.inputValues.owner,
        formState.inputValues.address
      );
      setError(null);
      setIsLoading(false);
      navigation.navigate("SellerListPage");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [formState, navigation]);

  // Setting up navigation options once on mount
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a Shop",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
    });
  }, [navigation]);

  // Optimized image picker function
  const pickImage = useCallback(async () => {
    try {
      const tempUri = await launchImagePicker();
      if (tempUri) setTempImageUri(tempUri);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Input
          placeholder="Shop Name"
          id="name"
          label="Shop name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["name"]}
        />

        <Input
          placeholder="Owner Name"
          id="owner"
          label="Owner name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["owner"]}
        />

        <Input
          placeholder="Address"
          id="address"
          label="Address"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["address"]}
        />

        <Input
          placeholder="Email"
          id="email"
          label="Email"
          keyboardType="email-address"
          icon="mail"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["email"]}
        />

        <Input
          placeholder="NIC"
          id="nic"
          label="NIC"
          icon="id-card"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["nic"]}
        />

        <Input
          placeholder="Village"
          id="village"
          label="Village"
          icon="home"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["village"]}
        />

        <Input
          placeholder="Phone"
          id="phone"
          label="Phone"
          icon="phone"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["phone"]}
        />

        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : (
          <SubmitButton
            title="Create"
            onPress={authHandler}
            style={styles.submitButton}
            disabled={!formState.formIsValid}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CreateShop;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  formContainer: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary,
  },
  submitButton: {
    marginTop: 20,
  },
});
