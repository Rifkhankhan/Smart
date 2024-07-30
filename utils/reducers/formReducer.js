import { validateInput } from '../actions/formActions'

export const reducer = (state, action) => {
	const { validationResult, inputId, inputValue } = action

	switch (action.type) {
		case 'plus': {
			const currentQty = Number(state.inputValues.qty)
			const newQty = +Math.max(currentQty + 1, 0)

			const result = validateInput('qty', newQty)

			const updatedValues = {
				...state.inputValues,
				['qty']: newQty
			}

			const updatedValidities = {
				...state.inputValidities,
				['qty']: result
			}

			let updatedFormIsValid = true

			for (const key in updatedValidities) {
				if (updatedValidities[key] !== undefined) {
					updatedFormIsValid = false
					break
				}
			}

			return {
				inputValues: updatedValues,
				inputValidities: updatedValidities,
				formIsValid: updatedFormIsValid
			}
		}

		case 'minus': {
			const currentQty = Number(state.inputValues.qty)
			const newQty = +Math.max(currentQty - 1, 0)
			const result = validateInput('qty', newQty)
			const updatedValues = {
				...state.inputValues,
				['qty']: newQty
			}

			const updatedValidities = {
				...state.inputValidities,
				['qty']: result
			}

			let updatedFormIsValid = true

			for (const key in updatedValidities) {
				if (updatedValidities[key] !== undefined) {
					updatedFormIsValid = false
					break
				}
			}

			return {
				inputValues: updatedValues,
				inputValidities: updatedValidities,
				formIsValid: updatedFormIsValid
			}
		}
		default:
			{
				const updatedValues = {
					...state.inputValues,
					[inputId]: inputValue
				}

				const updatedValidities = {
					...state.inputValidities,
					[inputId]: validationResult
				}

				let updatedFormIsValid = true

				for (const key in updatedValidities) {
					if (updatedValidities[key] !== undefined) {
						updatedFormIsValid = false
						break
					}
				}

				return {
					inputValues: updatedValues,
					inputValidities: updatedValidities,
					formIsValid: updatedFormIsValid
				}
			}
			break
	}
}
