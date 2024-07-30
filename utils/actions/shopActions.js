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
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

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

export const createShop = async (name, email, nic, village, owner, address) => {
	const app = getFirebaseApp()
	const auth = getAuth(app)

	const password = '123456'

	try {
		const result = await createUserWithEmailAndPassword(auth, email, password)
		const { uid, stsTokenManager } = result.user

		const firstLast = name.toLowerCase()
		const userData = {
			name,
			owner,
			village,
			firstLast,
			nic,
			address,
			role: 'shop',
			status: true,
			email,
			uid,
			signUpDate: new Date().toISOString(),

			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		const dbRef = ref(getDatabase())
		const userRef = child(dbRef, `users/${uid}`)

		const shopRef = child(dbRef, `shops/${uid}`)

		await set(userRef, userData)

		await push(shopRef, userData)
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

export const updateShop = async (userId, key, userData) => {
	const app = getFirebaseApp()
	const dbRef = ref(getDatabase(app))

	const userRef = child(dbRef, `users/${userId}`)
	const shopRef = child(dbRef, `shops/${userId}/${key}`)

	try {
		const cleanedCustomer = Object.fromEntries(
			Object.entries(userData).filter(([_, v]) => v !== null && v !== '')
		)

		await Promise.all([
			update(userRef, {
				...cleanedCustomer,
				updatedAt: new Date().toISOString()
			}),
			update(shopRef, {
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

export const deleteShop = async (userId, key) => {
	const app = getFirebaseApp()
	const dbRef = ref(getDatabase(app))

	// Reference to the shop to be deleted
	const shopRef = child(dbRef, `shops/${userId}/${key}`)
	const userRef = child(dbRef, `users/${userId}`)

	try {
		// Perform the delete operation

		// Perform updates concurrently
		await Promise.all([
			update(userRef, { updatedAt: new Date().toISOString() })
		])
		await remove(shopRef)
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
