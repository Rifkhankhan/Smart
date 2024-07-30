import React from 'react'
import { StyleSheet, Dimensions, FlatList, Image, View } from 'react-native'

const images = [
	{
		id: '1',
		image:
			'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
	},
	{
		id: '2',
		image:
			'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
	},
	{
		id: '3',
		image:
			'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
	},
	{
		id: '4',
		image:
			'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
	},
	{
		id: '5',
		image:
			'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
	}
]

const ImageCarousel = () => {
	const renderItem = ({ item }) => (
		<Image source={{ uri: item.image }} style={styles.image} />
	)

	return (
		<FlatList
			data={images}
			keyExtractor={item => item.id}
			renderItem={renderItem}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			style={styles.container}
		/>
	)
}

export default ImageCarousel

const styles = StyleSheet.create({
	container: {
		height: 200
	},
	image: {
		width: Dimensions.get('window').width,
		height: 200
	}
})
