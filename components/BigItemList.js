import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import HomeCard from './HomeCard'

const BigItemList = ({ title, subTitle }) => {
	const list = Array.from({ length: 16 }, (_, index) => ({ id: index + 1 }))
	const displayItems = list.slice(0, 10)

	const renderRow = rowItems => (
		<View style={styles.row}>
			{rowItems.map(item => (
				<HomeCard key={item.id} />
			))}
		</View>
	)

	const rows = []
	for (let i = 0; i < displayItems.length; i += 2) {
		rows.push(displayItems.slice(i, i + 2))
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subTitle}>{subTitle}</Text>
			</View>
			<FlatList
				data={rows}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => renderRow(item)}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.list}
			/>
		</View>
	)
}

export default BigItemList

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		borderRadius: 8,
		backgroundColor: '#fff',
		padding: 12,
		marginVertical: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 8
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#333'
	},
	subTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ff4757'
	},
	scrollContainer: {
		paddingVertical: 8
	},
	list: {
		flexDirection: 'row'
	},
	row: {
		flexDirection: 'row'
	}
})
