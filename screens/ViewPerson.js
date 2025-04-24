// import React, { useCallback, useLayoutEffect } from 'react'
// import {
// 	Button,
// 	Image,
// 	Pressable,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	View
// } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import { deleteUser, updateCutomer } from '../utils/actions/userActions'
// import { useDispatch } from 'react-redux'
// import defaultImage from './../assets/images/man.png'

// const ViewPerson = ({ route, navigation }) => {
// 	const { customer } = route.params || {} // Destructure customer
// 	const dispatch = useDispatch()

// 	const editHandler = useCallback(() => {
// 		navigation.navigate('EditPerson', { customer })
// 	}, [navigation, customer])

// 	const toggleBlock = async () => {
// 		try {
// 			const userData = { status: !customer?.status }
// 			await updateCutomer(customer?.uid, userData)
// 			navigation.navigate('CustomerList')
// 		} catch (error) {
// 			console.error('Error updating customer:', error)
// 		}
// 	}

// 	const deleteUserHandler = async () => {
// 		try {
// 			await deleteUser(customer?.uid)
// 			navigation.navigate('CustomerList')
// 		} catch (error) {
// 			console.error('Error deleting user:', error)
// 		}
// 	}

// 	useLayoutEffect(() => {
// 		navigation.setOptions({
// 			title: customer?.firstLast,
// 			headerStyle: { backgroundColor: '#333' },
// 			headerTintColor: '#fff',
// 			headerRight: () => (
// 				<Pressable
// 					onPress={editHandler}
// 					style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
// 					<Ionicons name="pencil" size={24} color="white" style={styles.icon} />
// 				</Pressable>
// 			)
// 		})
// 	}, [navigation, customer, editHandler])

// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			<View style={styles.imageContainer}>
// 				<Image
// 					source={
// 							customer?.profilePicture ||
// 							defaultImage
// 					}
// 					style={styles.image}
// 				/>
// 			</View>

// 			<View style={styles.section}>
// 				<Text style={styles.heading}>Personal Details</Text>
// 				<DetailItem label="First Name" value={customer?.firstName} />
// 				<DetailItem label="Last Name" value={customer?.lastName} />
// 				<DetailItem label="NIC" value={customer?.nic} />
// 				<DetailItem label="Address" value={customer?.address} />
// 			</View>

// 			<View style={styles.section}>
// 				<Text style={styles.heading}>Activity Details</Text>
// 				<DetailItem label="Orders" value="5" />
// 				<DetailItem label="Rank" value={customer?.rank} />
// 				<DetailItem
// 					label="Status"
// 					value={customer?.status ? 'Active' : 'Blocked'}
// 				/>
// 			</View>

// 			<View style={styles.section}>
// 				<Text style={styles.heading}>Actions</Text>
// 				<Button
// 					title={customer?.status ? 'Block the user' : 'Unblock the user'}
// 					color="#333"
// 					onPress={toggleBlock}
// 				/>
// 				<View style={styles.spacer} />
// 				<Button title="Delete" color="red" onPress={deleteUserHandler} />
// 			</View>
// 		</ScrollView>
// 	)
// }

// const DetailItem = React.memo(({ label, value }) => (
// 	<View style={styles.details}>
// 		<Text style={styles.detailLabel}>{label}:</Text>
// 		<Text style={styles.detail}>{value}</Text>
// 	</View>
// ))

// const styles = StyleSheet.create({
// 	container: {
// 		padding: 16,
// 		backgroundColor: '#f5f5f5'
// 	},
// 	imageContainer: {
// 		width: '100%',
// 		height: 250,
// 		marginBottom: 20,
// 		borderRadius: 10,
// 		overflow: 'hidden',
// 		alignSelf: 'center'
// 	},
// 	image: {
// 		width: '100%',
// 		height: '100%'
// 	},
// 	section: {
// 		backgroundColor: '#fff',
// 		borderRadius: 10,
// 		padding: 16,
// 		marginBottom: 20,
// 		elevation: 3
// 	},
// 	heading: {
// 		fontSize: 24,
// 		fontWeight: '700',
// 		marginBottom: 10,
// 		color: '#333',
// 		textAlign: 'center'
// 	},
// 	details: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		marginVertical: 5
// 	},
// 	detailLabel: {
// 		fontSize: 18,
// 		fontWeight: '600',
// 		color: '#555'
// 	},
// 	detail: {
// 		fontSize: 18,
// 		color: '#555'
// 	},
// 	icon: {
// 		marginRight: 15
// 	},
// 	spacer: {
// 		paddingVertical: 3
// 	}
// })

// export default ViewPerson


import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import {
	Button,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { deleteUser, updateCutomer } from '../utils/actions/userActions'
import { useDispatch } from 'react-redux'
import defaultImage from './../assets/images/man.png'

const ViewPerson = ({ route, navigation }) => {
	const { customer } = route.params || {} // Destructure customer
	const dispatch = useDispatch()

	// Memoize the edit handler to avoid unnecessary re-renders
	const editHandler = useCallback(() => {
		navigation.navigate('EditPerson', { customer })
	}, [navigation, customer])

	// Toggle block/unblock status
	const toggleBlock = async () => {
		try {
			const userData = { status: !customer?.status }
			await updateCutomer(customer?.uid, userData)
			navigation.navigate('CustomerList')
		} catch (error) {
			console.error('Error updating customer:', error)
		}
	}

	// Delete user handler
	const deleteUserHandler = async () => {
		try {
			await deleteUser(customer?.uid)
			navigation.navigate('CustomerList')
		} catch (error) {
			console.error('Error deleting user:', error)
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: customer?.firstLast,
			headerStyle: { backgroundColor: '#333' },
			headerTintColor: '#fff',
			headerRight: () => (
				<Pressable
					onPress={editHandler}
					style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
				>
					<Ionicons name="pencil" size={24} color="white" style={styles.icon} />
				</Pressable>
			)
		})
	}, [navigation, customer, editHandler])

	// Memoize sections to avoid unnecessary re-rendering
	const personalDetails = useMemo(() => (
		<View style={styles.section}>
			<Text style={styles.heading}>Personal Details</Text>
			<DetailItem label="First Name" value={customer?.firstName} />
			<DetailItem label="Last Name" value={customer?.lastName} />
			<DetailItem label="NIC" value={customer?.nic} />
			<DetailItem label="Address" value={customer?.address} />
		</View>
	), [customer])

	const activityDetails = useMemo(() => (
		<View style={styles.section}>
			<Text style={styles.heading}>Activity Details</Text>
			<DetailItem label="Orders" value="5" />
			<DetailItem label="Rank" value={customer?.rank} />
			<DetailItem
				label="Status"
				value={customer?.status ? 'Active' : 'Blocked'}
			/>
		</View>
	), [customer])

	const actions = useMemo(() => (
		<View style={styles.section}>
			<Text style={styles.heading}>Actions</Text>
			<Button
				title={customer?.status ? 'Block the user' : 'Unblock the user'}
				color="#333"
				onPress={toggleBlock}
			/>
			<View style={styles.spacer} />
			<Button title="Delete" color="red" onPress={deleteUserHandler} />
		</View>
	), [customer, toggleBlock, deleteUserHandler])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={customer?.profilePicture || defaultImage}
					style={styles.image}
				/>
			</View>

			{personalDetails}
			{activityDetails}
			{actions}
		</ScrollView>
	)
}

const DetailItem = React.memo(({ label, value }) => (
	<View style={styles.details}>
		<Text style={styles.detailLabel}>{label}:</Text>
		<Text style={styles.detail}>{value}</Text>
	</View>
))

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f5f5f5'
	},
	imageContainer: {
		width: '100%',
		height: 250,
		marginBottom: 20,
		borderRadius: 10,
		overflow: 'hidden',
		alignSelf: 'center'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	section: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 16,
		marginBottom: 20,
		elevation: 3
	},
	heading: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 10,
		color: '#333',
		textAlign: 'center'
	},
	details: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5
	},
	detailLabel: {
		fontSize: 18,
		fontWeight: '600',
		color: '#555'
	},
	detail: {
		fontSize: 18,
		color: '#555'
	},
	icon: {
		marginRight: 15
	},
	spacer: {
		paddingVertical: 3
	}
})

export default ViewPerson
