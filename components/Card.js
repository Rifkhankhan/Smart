import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Card = ({ product }) => {
	const navigation = useNavigation()

	const detailsHandler = () => {
		navigation.navigate('ProductDetails', { product: product || {} })
	}

	return (
		<TouchableOpacity style={styles.card} onPress={detailsHandler}>
			<Image
				source={{
					uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
				}}
				style={styles.image}
			/>
			<View style={styles.details}>
				<Text numberOfLines={2} style={styles.productName}>
					{product?.name}
				</Text>
				<View style={styles.reviewStars}>
					<Ionicons name="star" color="yellow" size={20} />
					<Text style={styles.reviewRate}>4/5 (71)</Text>
				</View>
				<View style={styles.coupons}>
					<Text style={styles.coupon1}>Free Delivery</Text>
					<Text style={styles.coupon2}>8 Vouchers</Text>
				</View>
				<View style={styles.priceContainer}>
					<Text style={styles.price}>Rs.{product?.price}</Text>
					<Text style={styles.oldPrice}>Rs.{product?.oPrice}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default Card

const styles = StyleSheet.create({
	card: {
		height: 300,
		backgroundColor: 'white',
		width: '48%',
		margin: 4,
		borderRadius: 8,
		overflow: 'hidden',
		elevation: 4, // Adds shadow for Android
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 }, // Adds shadow for iOS
		shadowOpacity: 0.2,
		shadowRadius: 8
	},
	image: {
		height: '55%',
		width: '100%'
	},
	details: {
		paddingHorizontal: 12,
		paddingVertical: 8
	},
	productName: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'left',
		marginBottom: 4
	},
	reviewStars: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 4
	},
	reviewRate: {
		paddingLeft: 4,
		fontSize: 14,
		color: '#555'
	},
	coupons: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 4
	},
	coupon1: {
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderWidth: 1,
		borderColor: 'blue',
		color: 'blue',
		fontSize: 12,
		marginRight: 4,
		borderRadius: 2
	},
	coupon2: {
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderWidth: 1,
		borderColor: 'red',
		color: 'red',
		fontSize: 12,
		borderRadius: 2
	},
	priceContainer: {
		flexDirection: 'row',
		paddingVertical: 4,
		alignItems: 'center'
	},
	price: {
		fontWeight: '700',
		fontSize: 16,
		color: 'red'
	},
	oldPrice: {
		textDecorationLine: 'line-through',
		paddingLeft: 4,
		fontSize: 14,
		color: '#999'
	}
})
