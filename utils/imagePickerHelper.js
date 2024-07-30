import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'
import { getFirebaseApp } from './firebaseHelper'
import uuid from 'react-native-uuid'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable
} from 'firebase/storage'

export const launchImagePicker = async () => {
	await checkMediaPermissions()

	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [1, 1],
		quality: 1
	})

	if (!result.cancelled) {
		return result.uri
	}
}

export const uploadImageAsync = async uri => {
	const app = getFirebaseApp()

	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.onload = function () {
			resolve(xhr.response)
		}

		xhr.onerror = function (e) {
			console.log(e)
			reject(new TypeError('Network request failed'))
		}

		xhr.responseType = 'blob'
		xhr.open('GET', uri, true)
		xhr.send()
	})

	const pathFolder = 'profilePics'
	const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`)

	await uploadBytesResumable(storageRef, blob)

	blob.close()

	return await getDownloadURL(storageRef)
}

const checkMediaPermissions = async () => {
	if (Platform.OS !== 'web') {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (permissionResult.granted === false) {
			return Promise.reject('We need permission to access your photos')
		}
	}

	return Promise.resolve()
}

// const pickImage = useCallback(async () => {
// 	try {
// 		const tempUri = await launchImagePicker()
// 		if (!tempUri) return

// 		setTempImageUri(tempUri)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }, [tempImageUri])

// const takePhoto = useCallback(async () => {
// 	try {
// 		const tempUri = await openCamera()
// 		if (!tempUri) return

// 		setTempImageUri(tempUri)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }, [tempImageUri])

// const uploadImage = useCallback(async () => {
// 	setIsLoading(true)

// 	try {
// 		let id = chatId
// 		if (!id) {
// 			// No chat Id. Create the chat
// 			id = await createChat(userData.userId, props.route.params.newChatData)
// 			setChatId(id)
// 		}

// 		const uploadUrl = await uploadImageAsync(tempImageUri, true)
// 		setIsLoading(false)

// 		await sendImage(
// 			id,
// 			userData.userId,
// 			uploadUrl,
// 			replyingTo && replyingTo.key
// 		)
// 		setReplyingTo(null)

// 		setTimeout(() => setTempImageUri(''), 500)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }, [isLoading, tempImageUri, chatId])
