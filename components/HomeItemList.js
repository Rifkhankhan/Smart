import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import HomeCard from './HomeCard'

const HomeItemList = ({ title, subTitle }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subTitle}>{subTitle}</Text>
			</View>
			<ScrollView
				style={styles.list}
				horizontal
				contentContainerStyle={styles.scrollContainer}
				showsHorizontalScrollIndicator={false}>
				<HomeCard />
				<HomeCard />
				<HomeCard />
				<HomeCard />
				<HomeCard />
				<HomeCard />
			</ScrollView>
		</View>
	)
}

export default HomeItemList

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		borderRadius: 4,
		backgroundColor: 'white',
		padding: 4,
		marginTop: 8,
		marginBottom: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 14 // For Android shadow
	},
	header: {
		flexDirection: 'row',
		padding: 8,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 22,
		textTransform: 'capitalize',
		fontWeight: '700',
		color: '#333'
	},
	subTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FF6F61' // Changed to a more modern color
	},
	list: {
		marginTop: 8 // Add some space between the header and the list
	},
	scrollContainer: {
		flexDirection: 'row',
		paddingHorizontal: 8 // Add some padding to the scroll container
	}
})
