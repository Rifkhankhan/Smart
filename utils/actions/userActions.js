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

export const getUserData = async userId => {
	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const userRef = child(dbRef, `users/${userId}`)

		const snapshot = await get(userRef)

		return snapshot.val()
	} catch (error) {
		console.log(error)
	}
}

export const getUserChats = async userId => {
	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const userRef = child(dbRef, `userChats/${userId}`)

		const snapshot = await get(userRef)
		return snapshot.val()
	} catch (error) {
		console.log(error)
	}
}

export const deleteUserChat = async (userId, key) => {
	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const chatRef = child(dbRef, `userChats/${userId}/${key}`)

		await remove(chatRef)
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const addUserChat = async (userId, chatId) => {
	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const chatRef = child(dbRef, `userChats/${userId}`)

		await push(chatRef, chatId)
	} catch (error) {
		console.log(error)
		throw error
	}
}

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

export const createCutomer = async (
	firstName,
	lastName,
	email,
	nic,
	address,
	password
) => {
	const app = getFirebaseApp()
	const auth = getAuth(app)

	try {
		const result = await createUserWithEmailAndPassword(auth, email, password)
		const { uid, stsTokenManager } = result.user

		const firstLast = `${firstName} ${lastName}`.toLowerCase()
		const userData = {
			firstName,
			lastName,
			firstLast,
			nic,
			address,
			role: 'customer',
			status: true,
			email,
			uid,
			signUpDate: new Date().toISOString()
		}

		const dbRef = ref(getDatabase())
		const userRef = child(dbRef, `users/${uid}`)
		await set(userRef, userData)
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

export const updateCutomer = async (userId, userData) => {
	const app = getFirebaseApp()
	const dbRef = ref(getDatabase(app))

	const userRef = child(dbRef, `users/${userId}`)

	try {
		const cleanedCustomer = Object.fromEntries(
			Object.entries(userData).filter(([_, v]) => v !== null && v !== '')
		)

		console.log(cleanedCustomer)

		await update(userRef, {
			...cleanedCustomer
		})
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

export const deleteUser = async userId => {
	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const userRef = child(dbRef, `users/${userId}`)
		const shopRef = child(dbRef, `shops/${userId}`)

		await Promise.all([remove(userRef), remove(shopRef)])
	} catch (error) {
		console.error(`Failed to delete user ${userId}:`, error)
		throw error // Consider handling this error at a higher level
	}
}
