import React, { useState, useLayoutEffect } from 'react'
import {
	FlatList,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../UI/IconButton'
import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'
import ShopListItem from '../components/ShopListItem'

const SellerListPage = ({ navigation }) => {
	const dispatch = useDispatch()
	const [isClicked, setIsClicked] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const shopsObjects = useSelector(state => state.shop.shops)

	const shops = Object.values(shopsObjects)

	const searchHandler = () => {
		setIsClicked(prev => !prev)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: '',
			headerTitleStyle: {
				width: '100%'
			},
			headerRight: () => (
				<IconButton
					name={isClicked ? 'close' : 'search'}
					color="white"
					size={24}
					onPress={searchHandler}
				/>
			)
		})
	}, [navigation, isClicked])

	const addCustomerHandler = () => {
		navigation.navigate('CreateShop')
	}

	return (
		<PageContainer>
			<PageTitle text="Shops" />

			<View style={styles.container}>
				{isClicked && (
					<View style={styles.searchBarContainer}>
						<TextInput
							placeholder="Type..."
							style={styles.searchBar}
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>
					</View>
				)}

				<FlatList
					data={shops}
					keyExtractor={shop => {
						return shop.uid
					}}
					renderItem={({ item }) => <ShopListItem key={item} shop={item} />}
				/>

				{!isClicked && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={addCustomerHandler}
						style={styles.plusBtnContainer}>
						<Image
							source={require('./../assets/images/plus.png')}
							style={styles.plusBtn}
						/>
					</TouchableOpacity>
				)}
			</View>
		</PageContainer>
	)
}

export default SellerListPage

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	plusBtn: {
		width: 50,
		height: 50
	},
	plusBtnContainer: {
		position: 'absolute',
		right: 15,
		bottom: 20
	},
	searchBarContainer: {
		marginVertical: 5,
		marginHorizontal: '5%',
		borderWidth: 1,
		borderRadius: 5,
		width: '90%'
	},
	searchBar: {
		padding: 5,
		fontSize: 18,
		height: 40
	}
})
