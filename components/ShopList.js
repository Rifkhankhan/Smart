import React from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import ShopCard from './ShopCard'

const ShopList = ({ shops }) => {
	return (
		<View>
			<View style={styles.similarProductsContainer}>
				{shops.length > 0 ? (
					<FlatList
						data={shops}
						keyExtractor={item => item.sid}
						renderItem={({ item }) => <ShopCard {...item} />}
						showsHorizontalScrollIndicator={false}
						numColumns={2}
						contentContainerStyle={styles.cards}
					/>
				) : (
					<View style={styles.noShopsContainer}>
						<Text>There are no shops</Text>
					</View>
				)}
			</View>
		</View>
	)
}

export default ShopList

const styles = StyleSheet.create({
	similarProductsContainer: {
		marginHorizontal: 8,
		marginVertical: 4,
		flexDirection: 'column'
	},
	cards: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	noShopsContainer: {
		alignItems: 'center',
		marginVertical: 16
	}
})
