import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import image from './../Images/logo.jpg'
// import { purple100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'

const LoginPage = ({ route, navigation }) => {
	const [isLogin, setIsLogin] = useState(false)
	const navigate = useNavigation()
	const dispatch = useDispatch()
	const [formValid, setFormValid] = useState(true)

	const replacePageHandler = () => {
		navigate.replace('SignupPage')
	}

	const [inputs, setInputs] = useState({
		name: { value: '', isValid: true },
		password: { value: '', isValid: true }
	})

	useEffect(() => {
		setFormValid(inputs.name.isValid && inputs.password.isValid)
	}, [inputs.name, inputs.password])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = async () => {
		console.log(inputs)

		const data = {
			name: inputs.name.value,
			password: inputs.password.value
		}

		const nameValid = data.name?.trim().length > 0
		const passwordValid = data.password?.trim().length > 5

		if (!nameValid || !passwordValid) {
			setInputs(currentInputs => {
				return {
					name: { value: currentInputs.name.value, isValid: nameValid },
					password: {
						value: currentInputs.password.value,
						isValid: passwordValid
					}
				}
			})

			return
		}

		// dispatch(updateCustomer(data))
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
						<Text style={styles.button}>Log in </Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button3} onPress={replacePageHandler}>
						<Text style={styles.button3}>Create an Account</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default LoginPage

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
		paddingBottom: '15px'
	},
	label: {
		paddingBottom: 4,
		fontSize: '20px',
		fontWeight: 510
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
