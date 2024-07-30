import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
// import { purple100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
import image from './../Images/logo.jpg'
import { signup } from '../Actions/AuthAction'

const SignupPage = ({ route, navigation }) => {
	const [isLogin, setIsLogin] = useState(false)
	const navigate = useNavigation()
	const dispatch = useDispatch()
	const [formValid, setFormValid] = useState(true)
	const [formsubmit, setFormSubmitValid] = useState(false)
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const replacePageHandler = () => {
		navigate.replace('LoginPage')
	}

	const [inputs, setInputs] = useState({
		name: { value: '', isValid: true },
		password: { value: '', isValid: true },
		village: { value: '', isValid: true },
		address: { value: '', isValid: true },
		nic: { value: '', isValid: true },
		phone: { value: '', isValid: true }
	})

	useEffect(() => {
		setFormValid(inputs.name.isValid && inputs.password.isValid)
	}, [inputs])

	useEffect(() => {
		if (isAuthenticated && formsubmit) {
			navigation.navigate('Home')
		}
	}, [formsubmit])
	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = async () => {
		const data = {
			name: inputs.name.value,
			password: inputs.password.value,
			nic: inputs.nic.value,
			phone: inputs.phone.value,
			address: inputs.address.value,
			village: inputs.village.value
		}

		const nameValid = data.name?.trim().length > 0
		const passwordValid = data.password?.trim().length > 0
		const addressValid = data.address?.trim().length > 0
		const villageValid = data.village?.trim().length > 0
		const phoneValid = data.phone?.trim().length > 0
		const nicValid =
			data.nic?.trim().length > 9 && data.nic?.trim().length <= 10

		if (
			!nameValid ||
			!passwordValid ||
			!addressValid ||
			!villageValid ||
			!phoneValid ||
			!nicValid
		) {
			setInputs(currentInputs => {
				return {
					name: { value: currentInputs.name.value, isValid: nameValid },
					village: {
						value: currentInputs.village.value,
						isValid: villageValid
					},
					address: {
						value: currentInputs.address.value,
						isValid: addressValid
					},
					nic: { value: currentInputs.nic.value, isValid: nicValid },
					phone: { value: currentInputs.phone.value, isValid: phoneValid },
					password: {
						value: currentInputs.password.value,
						isValid: passwordValid
					}
				}
			})

			return
		}

		dispatch(signup(data))
	}

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={image} style={styles.logoImage} />
			</View>
			<View style={styles.card}>
				<View style={styles.inputTag}>
					<TextInput
						placeholder="Name"
						textContentType="Name"
						style={{
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 5,
							fontSize: 18
						}}
						keyboardType="default"
						onChangeText={inputTextChangeHandler.bind(this, 'name')}
					/>
				</View>

				<View style={styles.inputTag}>
					<TextInput
						placeholder="Nic"
						textContentType="nic"
						style={{
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 5,
							fontSize: 18
						}}
						keyboardType="default"
						onChangeText={inputTextChangeHandler.bind(this, 'nic')}
					/>
				</View>
				<View style={styles.inputTag}>
					<TextInput
						placeholder="Address"
						textContentType="address"
						style={{
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 5,
							fontSize: 18
						}}
						keyboardType="default"
						onChangeText={inputTextChangeHandler.bind(this, 'address')}
					/>
				</View>

				<View style={styles.inputTag}>
					<TextInput
						placeholder="Village"
						textContentType="village"
						style={{
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 5,
							fontSize: 18
						}}
						keyboardType="default"
						onChangeText={inputTextChangeHandler.bind(this, 'village')}
					/>
				</View>

				<View style={styles.inputTag}>
					<TextInput
						placeholder="Phone"
						textContentType="phone"
						style={{
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 5,
							fontSize: 18
						}}
						keyboardType="default"
						onChangeText={inputTextChangeHandler.bind(this, 'phone')}
					/>
				</View>

				<View style={styles.inputTag}>
					<TextInput
						placeholder="Password"
						textContentType="password"
						style={{
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 5,
							fontSize: 18
						}}
						onChangeText={inputTextChangeHandler.bind(this, 'password')}
						keyboardType="default"
						secureTextEntry={true} // This line will hide the entered text
					/>
				</View>

				<View style={styles.buttons}>
					<TouchableOpacity onPress={submitHandler}>
						<Text style={styles.button}>Sign up </Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button3} onPress={replacePageHandler}>
						<Text style={styles.button3}>Login instead</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default SignupPage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'aqua',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	logoImage: {
		width: '80%',
		height: '100%',
		borderRadius: '50%',
		margin: 'auto'
	},
	card: {
		width: '80%',
		backgroundColor: '#28b8c8',
		borderRadius: 10,
		borderColor: 'black',
		height: 'auto',
		paddingHorizontal: '20px',
		paddingVertical: '20px',
		display: 'flex',
		justifyContent: 'center'
		// alignItems:'center'
	},
	logoContainer: {
		width: '80%',
		height: '30vh',
		marginVertical: '5vh'
	},
	inputTag: {
		paddingBottom: '15px',
		fontSize: '20px'
	},

	buttons: {
		display: 'flex',
		flexDirection: 'column'
	},
	button: {
		borderRadius: 5,
		border: 'none',
		padding: 5,
		marginBottom: 5,
		backgroundColor: 'red',
		color: 'white',
		fontWeight: 550,
		paddingVertical: 5,
		fontSize: '15px',
		textAlign: 'center'
	},

	button3: {
		backgroundColor: 'transparent',
		borderStyle: 'none',
		paddingTop: 5,
		fontSize: '15px',
		textAlign: 'center'
	}
})
