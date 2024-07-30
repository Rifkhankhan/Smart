import {
	Button,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { deleteShop, updateShop } from '../utils/actions/shopActions'

const ViewShop = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const shop = route?.params?.shop

	const editHandler = () => {
		navigation.navigate('EditShop', { shop: route?.params?.shop })
	}

	const toggleBlock = async () => {
		try {
			const userData = { status: !shop?.status }
			await updateShop(shop?.uid, shop.key, userData)
			navigation.navigate('SellerListPage')
		} catch (error) {
			console.error('Error updating shop:', error)
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: shop?.name,
			headerStyle: { backgroundColor: '#1E1E1E' },
			headerTintColor: 'white',
			headerRight: () => (
				<Pressable onPress={editHandler} style={styles.headerButton}>
					<Ionicons name="pencil" size={24} color="white" />
				</Pressable>
			)
		})
	}, [navigation, shop])

	const deleteShopHandler = async () => {
		try {
			await deleteShop(shop.uid, shop.key)
			// Navigate only after successful deletion
			navigation.navigate('SellerListPage')
		} catch (error) {
			// Handle error (e.g., show an alert or message to the user)
			alert(error.message || 'Failed to delete shop')
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={
						shop?.profilePicture
							? { uri: shop.profilePicture }
							: {
									uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708930468/shop4_uyti2o.jpg'
							  }
					}
					style={styles.image}
				/>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.heading}>Shop Details</Text>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Name:</Text>
					<Text style={styles.detail}>{shop?.name}</Text>
				</View>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Phone:</Text>
					<Text style={styles.detail}>{shop?.phone}</Text>
				</View>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Address:</Text>
					<Text style={styles.detail}>{shop?.address}</Text>
				</View>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Village:</Text>
					<Text style={styles.detail}>{shop?.village}</Text>
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.heading}>Activity Details</Text>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Orders:</Text>
					<Text style={styles.detail}>5</Text>
				</View>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Rank:</Text>
					<Text style={styles.detail}>{shop?.rank}</Text>
				</View>
				<View style={styles.detailRow}>
					<Text style={styles.detailLabel}>Status:</Text>
					<Text style={styles.detail}>
						{shop?.status ? 'Active' : 'Blocked'}
					</Text>
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.heading}>Actions</Text>
				<View style={styles.buttonContainer}>
					<Button
						title={shop?.status ? 'Block the Shop' : 'Unblock the Shop'}
						color="#FF6347"
						onPress={toggleBlock}
					/>
					<View style={{ paddingVertical: 2 }}></View>
					<Button
						title="Delete Shop"
						color="black"
						onPress={deleteShopHandler}
					/>
				</View>
			</View>
		</ScrollView>
	)
}

export default ViewShop

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 10,
		backgroundColor: '#F5F5F5'
	},
	imageContainer: {
		width: '100%',
		height: 250,
		marginBottom: 20,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#E0E0E0'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	detailsContainer: {
		width: '90%',
		marginVertical: 20,
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5
	},
	heading: {
		textAlign: 'center',
		fontSize: 22,
		marginVertical: 10,
		fontWeight: 'bold',
		color: '#333'
	},
	detailRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8
	},
	detailLabel: {
		fontSize: 18,
		fontWeight: '500',
		color: '#666'
	},
	detail: {
		fontSize: 18,
		color: '#333'
	},
	buttonContainer: {
		marginTop: 20
	},
	headerButton: {
		marginRight: 10,
		opacity: 1
	}
})
