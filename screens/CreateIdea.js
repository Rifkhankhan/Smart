import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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
import { Picker } from '@react-native-picker/picker'
import { validateInput } from '../utils/actions/formActions'
import { ActivityIndicator, Alert } from 'react-native'
import Input from '../components/Input'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { reducer } from '../utils/reducers/formReducer'
import SubmitButton from '../components/SubmitButton'
import { createCutomer } from '../utils/actions/userActions'
import SelectPicker from '../components/SelectPicker'
import { createProduct } from '../utils/actions/productActions'
import logoImage from "./../assets/images/logo.jpg";

const initialState = {
	inputValues: {
		name: '',
		description: '',
		oPrice: 0,
		price: 0,
		category: '',
		brand: '',
		stock: 0,
		shop: ''
	},
	inputValidities: {
		name: false,
		description: false,
		oPrice: false,
		price: false,
		brand: false,
		category: false,
		stock: false,
		shop: false
	},
	formIsValid: false
}

const CreateIdea = ({ navigation }) => {
	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [formState, dispatchFormState] = useReducer(reducer, initialState)
	const [tempImageUri, setTempImageUri] = useState('')
	const dispatch = useDispatch()

	const shopsObjects = useSelector(state => state.shop.shops)
	const shops = Object.values(shopsObjects)

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

	const createProductHandler = useCallback(async () => {
		try {
			setIsLoading(true)

			await createProduct({
				name: formState.inputValues.name,
				description: formState.inputValues.description,
				stock: formState.inputValues.stock,
				oPrice: formState.inputValues.oPrice,
				price: formState.inputValues.price,
				brand: formState.inputValues.brand,
				category: formState.inputValues.category,
				shop: formState.inputValues.shop
			})
			setError(null)

			setIsLoading(false)
		} catch (error) {
			setError(error.message)
			setIsLoading(false)
		}
	}, [dispatch, formState])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Create a Product',
			headerStyle: { backgroundColor: 'black' },
			headerTintColor: 'white',
			contentStyle: { backgroundColor: '#12845f' }
		})
	}, [navigation])

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
				<Text style={styles.heading}>Create a Product</Text>

				<Input
					placeholder="Name"
					id="name"
					label="Name"
					icon="user-o"
					iconPack={FontAwesome}
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['name']}
				/>

				<Input
					placeholder="Description"
					id="description"
					label="Description"
					icon="user-o"
					iconPack={FontAwesome}
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['description']}
				/>

				<Input
					placeholder="New Price"
					id="price"
					label="New Price"
					icon="user-o"
					keyboardType="numeric"
					keyboard
					iconPack={FontAwesome}
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['price']}
				/>

				<Input
					placeholder="Old Price"
					id="oPrice"
					label="Old Price"
					keyboardType="numeric"
					icon="lock"
					iconPack={Feather}
					keyboard
					onInputChanged={inputChangedHandler}
					autoCapitalize="none"
					errorText={formState.inputValidities['oPrice']}
				/>

				<Input
					placeholder="Category"
					id="category"
					label="Category"
					icon="lock"
					autoCapitalize="none"
					iconPack={Feather}
					onInputChanged={inputChangedHandler}
					errorText={formState.inputValidities['category']}
				/>

				<Input
					placeholder="Brand"
					id="brand"
					label="Brand"
					icon="lock"
					autoCapitalize="none"
					iconPack={Feather}
					onInputChanged={inputChangedHandler}
					errorText={formState.inputValidities['brand']}
				/>

				<Input
					placeholder="Stock"
					id="stock"
					label="Stock"
					keyboardType="number-pad"
					icon="lock"
					autoCapitalize="none"
					iconPack={Feather}
					onInputChanged={inputChangedHandler}
					errorText={formState.inputValidities['stock']}
				/>

				<SelectPicker
					placeholder="Shop"
					id="shop"
					label="Shop"
					icon="lock"
					datas={shops}
					autoCapitalize="none"
					iconPack={Feather}
					onInputChanged={inputChangedHandler}
					errorText={formState.inputValidities['shop']}
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
						onPress={createProductHandler}
						style={{ marginTop: 20 }}
						disabled={!formState.formIsValid}
					/>
				)}
			</View>
		</ScrollView>
	)
}

export default CreateIdea

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
