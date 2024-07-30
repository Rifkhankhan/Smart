import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CategoryList from '../components/HomeComponents/CategoryList'
import Carouselcomponent from '../components/HomeComponents/Carousel'

const Home = () => {
	return (
		<SafeAreaView>
			<CategoryList />

			{/* Carousel */}
			<Carouselcomponent />
			{/* New Things Carousel */}

			{/* Flash Sale */}

			{/* Products card */}
		</SafeAreaView>
	)
}

export default Home

const styles = StyleSheet.create({
	categoryList: {
		display: 'flex'
	},
	categoryBox: {
		borderWidth: 1,
		borderRadius: 5,
		padding: 2,
		marginHorizontal: 2
	}
})
