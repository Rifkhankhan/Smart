import React, { useState, useLayoutEffect, useMemo, useEffect } from 'react'
import {
	FlatList,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from './../../UI/IconButton'
import UserListItem from './../../components/UserListItem'
import PageTitle from './../../components/PageTitle'
import PageContainer from './../../components/PageContainer'
import ProductListItem from '../../components/ProductListItem'

const ProductListPage = ({ navigation }) => {
	const dispatch = useDispatch()
	let productsObjects = useSelector(state => state.product.products)

	const { authData } = useSelector(state => state.auth)

	if (authData.role === 'shop') {
		productsObjects = productsObjects.filter(
			product => product.shop === authData.shopKey
		)
	}

	useEffect(() => {}, [productsObjects])

	const products = useMemo(
		() => Object.values(productsObjects),
		[productsObjects]
	)

	const [isClicked, setIsClicked] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const searchHandler = () => {
		setIsClicked(current => !current)
	}

	const searchProducts = useMemo(
		() =>
			products.filter(product =>
				new RegExp(searchQuery, 'i').test(product.name)
			),
		[products, searchQuery]
	)

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
	}, [isClicked, navigation, searchHandler])

	const addCustomerHandler = () => {
		navigation.navigate('CreateProduct')
	}

	return (
		<PageContainer>
			<PageTitle text="Products" />
			{isClicked && (
				<View style={styles.searchBarContainer}>
					<TextInput
						placeholder="Type..."
						style={styles.searchBar}
						onChangeText={setSearchQuery}
						value={searchQuery}
					/>
				</View>
			)}
			<FlatList
				data={searchProducts}
				keyExtractor={product => product?.productKey}
				renderItem={({ item }) => <ProductListItem product={item} />}
			/>
			{!isClicked && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={addCustomerHandler}
					style={styles.plusBtnContainer}>
					<Image
						source={require('./../../assets/images/plus.png')}
						style={styles.plusbtn}
					/>
				</TouchableOpacity>
			)}
		</PageContainer>
	)
}

export default ProductListPage

const styles = StyleSheet.create({
	plusbtn: {
		width: 50,
		height: 50
	},
	plusBtnContainer: {
		position: 'absolute',
		right: 15,
		bottom: 20,
		width: 50,
		height: 50
	},
	searchBarContainer: {
		marginHorizontal: '5%',
		marginVertical: 5,
		borderWidth: 1,
		borderRadius: 5,
		width: '90%',
		padding: 5
	},
	searchBar: {
		padding: 5,
		fontSize: 18,
		height: 40,
		width: '100%'
	}
})
