import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeCard = ({ product }) => {
	const navigation = useNavigation()
	const onPressHandler = () => {
		navigation.navigate('ProductDetails', { product: product || {} })
	}
	return (
		<TouchableOpacity style={styles.container} onPress={onPressHandler}>
			<Image
				source={{
					uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
				}}
				style={styles.image}
			/>
			<Text style={styles.name} numberOfLines={2}>
				{product?.name}
			</Text>
			<Text style={styles.price}>Rs.{product?.price}</Text>
		</TouchableOpacity>
	)
}

export default HomeCard

const styles = StyleSheet.create({
	container: {
		width: 100,
		flexDirection: 'column',
		elevation: 0,
		margin: 2,
		height: 150,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'aqua'
	},
	image: {
		height: '60%',
		width: '80%',
		padding: 8,
		marginHorizontal: 'auto',
		borderRadius: 8
	},
	name: {
		fontWeight: '500',
		fontSize: 12,
		textAlign: 'auto',
		paddingHorizontal: 5
	},
	price: {
		fontWeight: '500',
		textAlign: 'justify',

		paddingHorizontal: 5,
		fontSize: 12,
		color: 'red'
	}
})
