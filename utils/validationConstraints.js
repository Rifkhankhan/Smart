import { validate } from 'validate.js'

export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
	const constraints = {
		presence: { allowEmpty }
	}

	if (!allowEmpty || value !== '') {
		constraints.length = {}

		if (minLength != null) {
			constraints.length.minimum = minLength
		}

		if (maxLength != null) {
			constraints.length.maximum = maxLength
		}
	}

	const validationResult = validate({ [id]: value }, { [id]: constraints })

	return validationResult && validationResult[id]
}

export const validateString = (id, value) => {
	const constraints = {
		presence: { allowEmpty: false }
	}

	if (value !== '') {
		constraints.format = {
			pattern: '[a-z]+',
			flags: 'i',
			message: 'value can only contain letters'
		}
	}

	const validationResult = validate({ [id]: value }, { [id]: constraints })

	return validationResult && validationResult[id]
}

export const validateEmail = (id, value) => {
	const constraints = {
		presence: { allowEmpty: false }
	}

	if (value !== '') {
		constraints.email = true
	}

	const validationResult = validate({ [id]: value }, { [id]: constraints })

	return validationResult && validationResult[id]
}

export const validatePassword = (id, value) => {
	const constraints = {
		presence: { allowEmpty: false }
	}

	if (value !== '') {
		constraints.length = {
			minimum: 6,
			message: 'must be at least 6 characters'
		}
	}

	const validationResult = validate({ [id]: value }, { [id]: constraints })

	return validationResult && validationResult[id]
}

export const validatePrice = (id, value) => {
	// Constraints for price validation
	const constraints = {
		price: {
			numericality: {
				onlyInteger: false, // Allow decimal values
				greaterThan: 0, // Ensure value is greater than 0
				strict: true // Ensure strict comparison
			}
		},
		oldPrice: {
			numericality: {
				onlyInteger: false, // Allow decimal values
				greaterThan: 0, // Ensure value is greater than 0
				strict: true // Ensure strict comparison
			}
		}
	}

	// Validate using the constraints for the specific field
	const validationResult = validate({ [id]: value }, { [id]: constraints[id] })

	// Return validation errors if any
	return validationResult && validationResult[id]
}

export const validateNumber = (id, value) => {
	// Constraints for integer price validation
	const constraints = {
		stock: {
			numericality: {
				onlyInteger: true, // Ensure only integer values
				greaterThan: 0, // Ensure value is greater than 0
				strict: true // Ensure strict comparison
			}
		}
	}

	// Validate using the constraints for the 'price' field
	const validationResult = validate({ [id]: value }, constraints)

	// Return validation errors if any
	return validationResult && validationResult[id]
}
