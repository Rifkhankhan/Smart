import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import { GlobalStyles } from '../../Constants/Styles'
import Button from '../../UI/Button'

const ExpanseForm = ({
	submitLabel,
	cancelHandler,
	onSubmitHandler,
	expanse
}) => {
	const [inputs, setInputs] = useState({
		name: { value: '', isValid: true },
		nic: { value: '', isValid: true },
		password: {
			value: expanse ? expanse?.date.toISOString().slice(0, 10) : '',
			isValid: true
		}
	})

	const formValid =
		inputs.price.isValid && inputs.description.isValid && inputs.date.isValid

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = () => {
		const data = {
			price: +inputs.price.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value
		}

		console.log(data)

		const priceIsValid = !isNaN(data.price) && data.price > 0
		const descriptionIsValid = data.description?.trim().length > 0
		const dateIsValid = data.date.toString() !== 'Invalid Date'

		if (!priceIsValid || !descriptionIsValid || !dateIsValid) {
			setInputs(currentInputs => {
				return {
					date: { value: currentInputs.date.value, isValid: dateIsValid },
					description: {
						value: currentInputs.description.value,
						isValid: descriptionIsValid
					},
					price: { value: currentInputs.price.value, isValid: priceIsValid }
				}
			})
			return
		}

		onSubmitHandler(data)
	}
	return (
		<View style={styles.container}>
			<View style={styles.inputRow}>
				<Input
					style={styles.rowInput}
					label="Price"
					inValid={!inputs.price.isValid}
					textInputConfig={{
						onChangeText: inputTextChangeHandler.bind(this, 'price'),

						keyboardType: 'decimal-pad',
						value: inputs.price.value
					}}
				/>
				<Input
					style={styles.rowInput}
					label="Date"
					inValid={!inputs.date.isValid}
					textInputConfig={{
						maxLength: 10,
						onChangeText: inputTextChangeHandler.bind(this, 'date'),

						placeholder: 'YYYY-MM-DD',
						value: inputs.date.value
					}}
				/>
			</View>
			<Input
				label="Description"
				inValid={!inputs.description.isValid}
				textInputConfig={{
					onChangeText: inputTextChangeHandler.bind(this, 'description'),

					multiline: true,
					value: inputs.description.value
				}}
			/>
			{!formValid && (
				<View style={styles.errorMessageContainer}>
					<Text style={styles.errorMessage}>Invalid Data Please check!</Text>
				</View>
			)}
			<View style={styles.innerContainer}>
				<Button
					btnColor={GlobalStyles.colors.primary200}
					title="Cancel"
					onPress={cancelHandler}
				/>
				<Button
					btnColor="green"
					title={submitLabel}
					color="white"
					onPress={submitHandler}
				/>
			</View>
		</View>
	)
}

export default ExpanseForm

const styles = StyleSheet.create({
	inputRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rowInput: {
		flex: 1
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8
	},
	errorMessageContainer: {
		padding: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorMessage: {
		color: 'red',
		fontSize: 14
	}
})
