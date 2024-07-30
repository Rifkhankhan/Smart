import {
	child,
	endAt,
	get,
	getDatabase,
	orderByChild,
	push,
	query,
	ref,
	remove,
	set,
	startAt,
	update
} from 'firebase/database'
import { getFirebaseApp } from '../firebaseHelper'
import { removeProduct } from './../../store/productSlice'

export const searchUsers = async queryText => {
	const searchTerm = queryText.toLowerCase()

	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const userRef = child(dbRef, 'users')

		const queryRef = query(
			userRef,
			orderByChild('firstLast'),
			startAt(searchTerm),
			endAt(searchTerm + '\uf8ff')
		)

		const snapshot = await get(queryRef)

		if (snapshot.exists()) {
			return snapshot.val()
		}

		return {}
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const createProduct = async data => {
	const app = getFirebaseApp()

	try {
		const userData = {
			...data,

			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		console.log(userData)

		const dbRef = ref(getDatabase(app))
		const dataRef = child(dbRef, `products/${data.shop}`)

		await push(dataRef, userData)
	} catch (error) {
		console.log(error)
		const errorCode = error.code

		let message = 'Something went wrong.'

		if (errorCode === 'auth/email-already-in-use') {
			message = 'This email is already in use'
		} else {
			message = errorCode
		}

		throw new Error(message)
	}
}

export const updateProduct = async (shopKey, productKey, data) => {
	const app = getFirebaseApp()
	const dbRef = ref(getDatabase(app))

	const shopRef = child(dbRef, `shops/${shopKey}`)
	const productRef = child(dbRef, `products/${shopKey}/${productKey}`)

	try {
		const cleanedCustomer = Object.fromEntries(
			Object.entries(data).filter(([_, v]) => v !== null && v !== '')
		)

		await Promise.all([
			update(productRef, {
				...cleanedCustomer,
				updatedAt: new Date().toISOString()
			})
		])
	} catch (error) {
		console.log(error)
		const errorCode = error.code

		let message = 'Something went wrong.'

		if (errorCode === 'auth/email-already-in-use') {
			message = 'This email is already in use'
		} else {
			message = errorCode
		}

		throw new Error(message)
	}
}

export const deleteProduct = (shopKey, productKey) => {
	return async dispatch => {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))

		// Reference to the shop to be deleted
		const shopRef = child(dbRef, `shops/${shopKey}`)
		const productRef = child(dbRef, `products/${shopKey}/${productKey}`)

		try {
			// Perform the delete operation

			// Perform updates concurrently
			await Promise.all([
				// update(shopRef, { updatedAt: new Date().toISOString() }),
				await remove(productRef)
			])

			dispatch(removeProduct(productKey))
		} catch (error) {
			console.error('Error deleting shop:', error)

			const errorCode = error.code || 'unknown'

			let message = 'Something went wrong.'

			// Customize error messages based on Firebase error codes
			switch (errorCode) {
				case 'auth/email-already-in-use':
					message = 'This email is already in use'
					break
				// Add other cases as needed
				default:
					message = 'An unexpected error occurred'
			}

			throw new Error(message)
		}
	}
}
