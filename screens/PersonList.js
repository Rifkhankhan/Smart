import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux' // Added import
import PersonCard from './../components/PersonCard'

const PersonList = ({ customers }) => {
	const renderItem = ({ item }) => <PersonCard {...item} />

	return (
		<FlatList
			data={customers}
			renderItem={renderItem}
			keyExtractor={item => item.cid.toString()}
			ListEmptyComponent={
				<View style={styles.emptyContainer}>
					<Text>There are no customers</Text>
				</View>
			}
			showsVerticalScrollIndicator={false}
			numColumns={2}
			contentContainerStyle={styles.cards}
		/>
	)
}

export default PersonList

const styles = StyleSheet.create({
	emptyContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	cards: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
})
