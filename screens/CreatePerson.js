import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { ScrollView } from 'react-native'
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useReducer,
	useState
} from 'react'
import colors from '../constants/colors'
import { Asset } from "expo-asset";

import { launchImagePicker } from '../utils/imagePickerHelper'

import { validateInput } from '../utils/actions/formActions'
import { ActivityIndicator, Alert } from 'react-native'
import Input from '../components/Input'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { reducer } from '../utils/reducers/formReducer'
import SubmitButton from '../components/SubmitButton'
import { createCutomer } from '../utils/actions/userActions'
import logoImage from "./../assets/images/logo.jpg";

const initialState = {
	inputValues: {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		nic: '',
		address: ''
	},
	inputValidities: {
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		nic: false,
		address: false
	},
	formIsValid: false
}

const CreatePerson = ({ route, navigation }) => {
	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [formState, dispatchFormState] = useReducer(reducer, initialState)
	const [tempImageUri, setTempImageUri] = useState('')
	const dispatch = useDispatch()

	const inputChangedHandler = useCallback(
		(inputId, inputValue) => {
			const result = validateInput(inputId, inputValue)
			dispatchFormState({ inputId, validationResult: result, inputValue })
		},
		[dispatchFormState]
	)

	useEffect(() => {
		if (error) {
			Alert.alert('An error occured', error, [{ text: 'Okay' }])
		}
	}, [error])

	const authHandler = useCallback(async () => {
		try {
			setIsLoading(true)

			await createCutomer(
				formState.inputValues.firstName,
				formState.inputValues.lastName,
				formState.inputValues.email,
				formState.inputValues.nic,
				formState.inputValues.address,
				formState.inputValues.password
			)
			setError(null)

			setIsLoading(false)
			navigation.navigate('CustomerList')
		} catch (error) {
			setError(error.message)
			setIsLoading(false)
		}
	}, [dispatch, formState])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Create Person',
			headerStyle: { backgroundColor: 'black' },
			headerTintColor: 'white',
			contentStyle: { backgroundColor: '#12845f' }
		})
	}, [navigation])

	const cancelHandler = () => {
		navigation.goBack()
	}

	const pickImage = useCallback(async () => {
		try {
			const tempUri = await launchImagePicker()
			if (tempUri) setTempImageUri(tempUri)
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<ScrollView style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={logoImage}
					style={styles.logo}
				/>
			</View>

			<View style={styles.formContainer}>
				<Text style={styles.heading}>Create a Customer</Text>

				<Input
					placeholder="First Name"
					id="firstName"
					label="First name"
					icon="user-o"
					iconPack={FontAwesome}
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['firstName']}
				/>

				<Input
					placeholder="Last Name"
					id="lastName"
					label="Last name"
					icon="user-o"
					iconPack={FontAwesome}
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['lastName']}
				/>

				<Input
					placeholder="Address"
					id="address"
					label="Address"
					icon="user-o"
					iconPack={FontAwesome}
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['address']}
				/>

				<Input
					placeholder="Email"
					id="email"
					label="Email"
					keyboardType="email-address"
					icon="mail"
					iconPack={Feather}
					keyboard
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['email']}
				/>

				<Input
					placeholder="Nic"
					id="nic"
					label="Nic"
					icon="lock"
					autoCapitalize="none"
					secureTextEntry
					iconPack={Feather}
					onInputChanged={inputChangedHandler}
					errorText={formState.inputValidities['nic']}
				/>

				<Input
					placeholder="Password"
					id="password"
					label="Password"
					icon="lock"
					autoCapitalize="none"
					secureTextEntry
					iconPack={Feather}
					onInputChanged={inputChangedHandler}
					errorText={formState.inputValidities['password']}
				/>

				{isLoading ? (
					<ActivityIndicator
						size={'small'}
						color={colors.primary}
						style={{ marginTop: 10 }}
					/>
				) : (
					<SubmitButton
						title="Create"
						onPress={authHandler}
						style={{ marginTop: 20 }}
						disabled={!formState.formIsValid}
					/>
				)}
			</View>
		</ScrollView>
	)
}

export default CreatePerson

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		padding: 16
	},
	logoContainer: {
		alignItems: 'center',
		borderRadius: 8
	},
	logo: {
		width: 150,
		height: 150,
		borderRadius: 75
	},
	formContainer: {
		backgroundColor: '#fff',
		padding: 16,
		marginVertical: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center'
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 16,
		fontSize: 16
	},
	textArea: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 16,
		fontSize: 16,
		height: 100
	},
	picker: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 16,
		fontSize: 16
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	errorMessageContainer: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 8,
		marginBottom: 16,
		alignItems: 'center'
	},
	errorMessage: {
		color: 'white',
		fontSize: 16
	},
	invalid: {
		borderColor: 'red'
	}
})
