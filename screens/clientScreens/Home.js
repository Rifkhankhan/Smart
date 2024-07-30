import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
	SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import CategoryComponent from '../components/CategoryComponent'
import HomeItemList from '../components/HomeItemList'
import BigItemList from '../components/BigItemList'
import Card from '../components/Card'
import CardContainer from '../components/CardContainer'

const AdminHome = ({ navigation }) => {
	const [isClicked, setIsClicked] = useState(false)

	const toggleSearchHandler = () => {
		setIsClicked(prevState => !prevState)
	}

	const createIdea = () => {
		navigation.navigate('CreateIdea')
	}

	return (
		<>
			<SafeAreaView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<CategoryComponent />
					<HomeItemList title="Services" />
					<BigItemList title="Today Offers" subTitle="Limited" />
					<HomeItemList title="Everything Under" subTitle="Rs.99" />

					<CardContainer />
				</ScrollView>
			</SafeAreaView>
		</>
	)
}

export default AdminHome

const styles = StyleSheet.create({
	productCardContainer: {
		padding: 4,
		backgroundColor: '#15df',
		marginHorizontal: 8,
		marginVertical: 10,
		borderRadius: 8,
		elevation: 3
	},
	plusButton: {
		position: 'absolute',
		right: 15,
		bottom: 20,
		width: 50,
		height: 50
	},
	plusImage: {
		width: '100%',
		height: '100%'
	},
	title: {
		paddingLeft: 8,
		fontSize: 20,
		fontWeight: '600',
		paddingVertical: 8
	},
	cards: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
})
