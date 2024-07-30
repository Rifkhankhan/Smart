import {
	validateEmail,
	validateLength,
	validateNumber,
	validatePassword,
	validatePrice,
	validateString
} from '../validationConstraints'

export const validateInput = (inputId, inputValue) => {
	if (
		inputId === 'firstName' ||
		inputId === 'lastName' ||
		inputId === 'category' ||
		inputId === 'brand' ||
		inputId === 'village' ||
		inputId === 'owner'
	) {
		return validateString(inputId, inputValue)
	} else if (inputId === 'email') {
		return validateEmail(inputId, inputValue)
	} else if (inputId === 'password') {
		return validatePassword(inputId, inputValue)
	} else if (inputId === 'about') {
		return validateLength(inputId, inputValue, 0, 150, true)
	} else if (inputId === 'chatName' || inputId === 'village') {
		return validateLength(inputId, inputValue, 5, 50, false)
	} else if (inputId === 'nic' || inputId === 'phone') {
		return validateLength(inputId, inputValue, 9, 10, false)
	} else if (
		inputId === 'address' ||
		inputId === 'name' ||
		inputId === 'description'
	) {
		return validateLength(inputId, inputValue, 5, 150, false)
	} else if (inputId === 'price' || inputId === 'oldPrice') {
		return validatePrice(inputId, inputValue)
	} else if (inputId === 'stock' || inputId === 'qty') {
		return validateNumber(inputId, inputValue)
	}
}
