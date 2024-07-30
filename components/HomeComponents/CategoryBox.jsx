import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CategoryBox = ({ name }) => {
	return (
		<View style={styles.categoryBox}>
			<Text style={styles.name}>{name}</Text>
		</View>
	)
}

export default CategoryBox

const styles = StyleSheet.create({
	categoryList: {
		display: 'flex'
	},
	name: {
		fontSize: 15
	},
	categoryBox: {
		borderWidth: 1,
		borderRadius: 5,
		padding: 2,
		marginHorizontal: 2
	}
})
