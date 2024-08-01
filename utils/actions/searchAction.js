import {
	child,
	endAt,
	get,
	getDatabase,
	orderByChild,
	query,
	startAt
} from 'firebase/database'
import { getFirebaseApp } from '../firebaseHelper'

export const searchItems = async (queryText, type) => {
	const searchTerm = queryText.toLowerCase()

	try {
		const app = getFirebaseApp()
		const dbRef = ref(getDatabase(app))
		const userRef = child(dbRef, type)

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
