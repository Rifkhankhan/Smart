import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CategoryBox from './CategoryBox'

const CategoryList = () => {
	return (
		<ScrollView
			horizontal
			style={styles.categoryList}
			showsVerticalScrollIndicator={false}>
			<CategoryBox name="Gift" />
			<CategoryBox name="Toys" />
			<CategoryBox name="Foods" />
			<CategoryBox name="Home Things" />
			<CategoryBox name="Shoes" />
			<CategoryBox name="Dress" />
			<CategoryBox name="Cosmatics" />
		</ScrollView>
	)
}

export default CategoryList

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
