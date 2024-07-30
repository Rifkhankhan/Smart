// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

export const getFirebaseApp = () => {
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: 'AIzaSyAZTm81Boii_yaU1McZHmJGkoLlPTpDttY',
		authDomain: 'smart-2464c.firebaseapp.com',
		databaseURL: 'https://smart-2464c-default-rtdb.firebaseio.com',
		projectId: 'smart-2464c',
		storageBucket: 'smart-2464c.appspot.com',
		messagingSenderId: '698224054545',
		appId: '1:698224054545:web:45663d9588d87f2a17bcb0',
		measurementId: 'G-VBD54HHDRE'
	}

	// Initialize Firebase
	return initializeApp(firebaseConfig)
}
