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
import React, { useState, useEffect } from 'react'
import CategoryComponent from '../components/CategoryComponent'
import HomeItemList from '../components/HomeItemList'
import BigItemList from '../components/BigItemList'
import Card from '../components/Card'
import CardContainer from '../components/CardContainer'
import { Ionicons } from '@expo/vector-icons'

const AdminHome = ({ navigation }) => {
	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		navigation.setOptions({
			headerRight: ({ size, color }) => {
				return (
					<Ionicons
						onPress={() => navigation.navigate('SearchScreen')}
						style={{ marginRight: 10 }}
						name="search"
						color="white"
						size={24}
					/>
				)
			}
		})
	}, [])

	const renderComponents = () => (
		<>
			<CategoryComponent />
			<HomeItemList title="Services" />
			<BigItemList title="Today Offers" subTitle="Limited" />
			<HomeItemList title="Everything Under" subTitle="Rs.99" />
		</>
	)

	return (
		<>
			<SafeAreaView>
				<FlatList
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={renderComponents}
					ListFooterComponent={() => (
						<>
							<CardContainer header="Just For You" />
						</>
					)}
				/>
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
