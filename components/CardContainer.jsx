import React, { memo } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { FlatList } from 'react-native'
import Card from './../components/Card'
import { useSelector } from 'react-redux'

// Memoize the Card component
const MemoizedCard = memo(({ product }) => <Card product={product} />)

const CardContainer = ({ header }) => {
	const products = useSelector(state => state.product.products)

	const renderItem = ({ item }) => <MemoizedCard product={item} />

	return (
		<View style={styles.productCardContainer}>
			{header && <Text style={styles.title}>{header}</Text>}
			<View style={styles.cards}>
				<FlatList
					data={products}
					renderItem={renderItem}
					keyExtractor={item => item.productKey}
					numColumns={2}
				/>
			</View>
		</View>
	)
}

export default CardContainer

const styles = StyleSheet.create({
	productCardContainer: {
		flexDirection: 'column',
		justifyContent:'center',
		alignItems:'center'
	},
	title: {
		paddingLeft: 8,
		fontSize: 20,
		textTransform: 'capitalize',
		fontWeight: '600',
		paddingVertical: 8
	},
	cards: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	}
})
